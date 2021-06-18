<template>
	<div>
		<div class="cellular-automata">
			<div ref="cc" id="cc"></div>

			<div class="side">
				<fieldset id="controls">
					<legend>Controls</legend>
					<div class="btn-group">
						<button id="new" type="button" class="my-btn">
							New
						</button>
						<button id="add" class="my-btn">
							Add to collection
						</button>
					</div>
				</fieldset>

				<fieldset id="rule">
					<legend>Rule</legend>

					<input type="text" id="curRule" value="2433794339711229" />
				</fieldset>

				<fieldset id="dynamics">
					<legend>Dynamics</legend>
					<div>
						<label for="size">Size:</label>
						<input
							type="text"
							name="size"
							class="dim"
							id="size"
							value="100"
						/>
					</div>

					<div>
						<label for="initial">Initial States:</label>
						<select name="initial" class="dim" id="initial">
							<option value="center">Center</option>
							<option value="pattern">Pattern</option>
							<option value="rand" selected="selected">
								Random
							</option>
						</select>
					</div>

					<div>
						<label for="states"># of States:</label>
						<select name="states" class="dim" id="states">
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4" selected="selected">4</option>
						</select>
					</div>
				</fieldset>

				<fieldset id="style">
					<legend>Style</legend>

					<div id="colors">
						<div>
							<label for="default" style="cursor: pointer"
								>Default Colors:</label
							>
							<input
								type="radio"
								class="color"
								name="color"
								value="default"
								id="default"
								checked
							/>
						</div>
						<div>
							<label for="rand" style="cursor: pointer"
								>Random Colors:</label
							>
							<input
								type="radio"
								class="color"
								name="color"
								value="rand"
								id="rand"
							/>
						</div>
						<div>
							<label for="BW" style="cursor: pointer"
								>Grayscale:</label
							>
							<input
								type="radio"
								class="color"
								name="color"
								value="BW"
								id="BW"
							/>
						</div>
						<div>
							<label for="isolate" style="cursor: pointer"
								>Isolate:</label
							>
							<input
								type="radio"
								class="color"
								name="color"
								value="isolate"
								id="isolate"
							/>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
		<hr />
		<div class="collection">
			<h2 class="my-collection">My Collection</h2>
			<WorldCollection :worlds="worlds" />
		</div>
	</div>
</template>

<script>
import p5 from "p5";
import axios from "axios";
const uuidv4 = require("uuid/v4");
import WorldCollection from "@/components/WorldCollection.vue";

export default {
	name: "CellularAutomata",
	components: {
		WorldCollection
	},
	data() {
		return {
			worlds: [],
			sketchInstance: null,
			file: null,
			rule: "",
			initialType: "",
			numOfStates: 0,
			size: 0,
			colors: [],
			error: "",
		};
	},
	mounted() {
		const cc = this.$refs.cc;
		// console.log(cc);
		if (cc.firstChild) {
			cc.removeChild(cc.lastChild);
		}

		const sketch = (s) => {
			let restart = true;
			let recalculate = true;
			let cellW;

			let graph = {
				size: 100,
				states: 4,
				ruleNum: 2433794339711229,
				styleType: "default",
				colors: [],
				initialType: "rand",
				running: false,
				vector: [],
				init: function () {
					let row = [];

					if (this.initialType == "center") {
						for (let i = 0; i < this.size; i++) {
							if (i == Math.floor(this.size / 2)) {
								row.push(1);
							} else {
								row.push(0);
							}
						}
					} else if (this.initialType == "pattern") {
						for (let i = 0; i < this.size; i++) {
							row.push(i % this.states);
						}
					} else {
						// ((this.initialType = "rand")) {
						for (let i = 0; i < this.size; i++) {
							row.push(Math.floor(Math.random() * this.states));
						}
					}

					this.vector.push(row);
					return row;
				},
				getRule: function () {
					let rule = this.ruleNum.toString(this.states);
					while (rule.length < Math.pow(this.states, 3)) {
						rule = "0" + rule;
					}
					return rule;
				},
				rule: "",
				iterate: function () {
					let row = [];
					const previous = this.vector[this.vector.length - 1];
					for (let i = 0; i < this.size; i++) {
						let key = "";
						for (let j = i - 1; j < i + 2; j++) {
							key += previous[(this.size + j) % this.size];
						}
						row.push(
							parseInt(this.rule[parseInt(key, this.states)])
						);
					}
					this.vector.push(row);
					return row;
				},
			};

			cc.onmousedown = (e) => {
				e.preventDefault();
			};

			let cnv;
			s.setup = () => {
				cnv = s.createCanvas(5, 5);
				cnv.parent("cc");
				setDimensions();
				s.background(47);
				s.noStroke();

				// s.noLoop();

				begin();
			};

			let hovered = -1;

			s.draw = () => {
				s.cursor(s.ARROW);
				if (hovered > -1) {
					const color = graph.colors[graph.vector[0][hovered]];
					s.fill(color);
					s.stroke(color);
					s.square(cellW * hovered, 0, cellW);
					// outline(hovered, color)
					hovered = -1;
				}
				// Handle hovering inital cells
				if (
					s.mouseY > 0 &&
					s.mouseY < cellW &&
					s.mouseX < s.width &&
					s.mouseX > 0
				) {
					s.cursor("pointer");
					const h = Math.floor(s.mouseX / cellW);
					s.fill("rgba(255, 255, 255, 0.25)");
					s.stroke("rgba(255, 255, 255, 0.1)");
					s.square(h * cellW, 0, cellW);
					hovered = h;
				}
				if (restart) {
					graph.vector = [];
					display(graph.init());
					recalculate = true;
				}
				restart = false;
				if (recalculate) {
					const row = graph.iterate();
					display(row);
				}
				if (graph.vector.length * cellW >= s.height) {
					recalculate = false;
				}
				if (graph.vector.length == 2) {
					const len = graph.vector[0].length;
					for (let i = 0; i < len; i++) {
						const cell = graph.vector[0][i];
						const color = graph.colors[cell];
						s.stroke(color);
						s.fill(color);
						s.square(cellW * i, 0, cellW);
					}
				}
			};

			function setDimensions() {
				s.resizeCanvas(1, 1);
				let w = cc.offsetWidth;
				cellW = w / graph.size;
				// cc.style.width = `${w}px`;
				let h = w * 0.75;
				s.resizeCanvas(w, h);
				console.log("we resized!");
				begin();
			}

			// Handle window resizing
			s.windowResized = () => {
				setDimensions();
			};

			function display(row) {
				const len = row.length;
				const level = graph.vector.length - 1;
				for (let i = 0; i < len; i++) {
					const cell = row[i];
					const color = graph.colors[cell];
					s.stroke(color);
					s.fill(color);
					s.square(cellW * i, cellW * level, cellW);
				}
			}

			// Handle changing inital cells with a click event
			s.mouseClicked = () => {
				if (
					s.mouseY > 0 &&
					s.mouseY < cellW &&
					s.mouseX < s.width &&
					s.mouseX > 0
				) {
					let h = Math.floor(s.mouseX / cellW);
					let row = graph.vector[0];
					row[h] = (row[h] + 1) % graph.states;
					graph.vector = [row];
					display(row);
					recalculate = true;
				}
			};

			// rule setting
			function setRule() {
				let num = graph.states;

				if (num == 2) {
					graph.ruleNum = Math.floor(Math.random() * 257);
				} else if (num == 3) {
					graph.ruleNum = Math.floor(Math.random() * 7625597484987);
				} else if (num == 4) {
					graph.ruleNum = Math.floor(
						Math.random() * 9007199254740990
					);
				}
			}

			let curIsolate = 0;
			// set style
			function setStyle() {
				let val = graph.styleType;

				if (val == "default") {
					graph.colors = [
						"SteelBlue",
						"rgb(8, 43, 94)",
						"SandyBrown",
						"HotPink",
					];
				} else if (val == "BW") {
					graph.colors = [];
					const delta = Math.floor(255 / (graph.states - 1));
					for (let i = 255; i >= 0; i -= delta) {
						graph.colors.push(i);
					}
				} else if (val == "rand") {
					graph.colors = [];
					for (let i = 0; i < 4; i++) {
						graph.colors.push(
							"#" +
								Math.floor(Math.random() * 16777215).toString(
									16
								)
						);
					}
				} else if (val == "isolate") {
					curIsolate %= graph.states;
					graph.colors = [];
					for (let i = 0; i < 4; i++) {
						if (i == curIsolate) {
							graph.colors.push("SteelBlue");
						} else {
							const darkGrey =
								20 + Math.floor(Math.random() * 30);
							graph.colors.push(
								`rgb(${darkGrey}, ${darkGrey}, ${darkGrey})`
							);
						}
					}
					curIsolate = (curIsolate + 1) % graph.states;
				}
			}
			setStyle();

			// log the current rule in case it's cool and load the first line
			function begin() {
				graph.vector = [];
				displayRule();
				graph.rule = graph.getRule().split("").reverse().join("");
				restart = true;
			}

			// rule functions
			function displayRule() {
				document.getElementById("curRule").value = graph.ruleNum;
			}

			function updateRule() {
				const val = document.getElementById("curRule").value;
				if (val != "") {
					graph.ruleNum = parseInt(
						document.getElementById("curRule").value
					);
					begin();
				}
			}

			document
				.getElementById("curRule")
				.addEventListener("input", updateRule);

			// change style
			function changeStyle() {
				var ele = document.getElementsByName("color");

				for (let i = 0; i < ele.length; i++) {
					if (ele[i].checked) {
						graph.styleType = ele[i].value;
						break;
					}
				}

				setStyle();
				begin();
			}

			document
				.getElementById("default")
				.addEventListener("click", changeStyle);
			document
				.getElementById("BW")
				.addEventListener("click", changeStyle);
			document
				.getElementById("rand")
				.addEventListener("click", changeStyle);
			document
				.getElementById("isolate")
				.addEventListener("click", changeStyle);

			// reset/new
			function reset() {
				setRule();
				begin();
			}

			document.getElementById("new").addEventListener("click", reset);

			// initial state change
			function initChange() {
				graph.initialType = document.getElementById("initial").value;
				begin();
			}

			document
				.getElementById("initial")
				.addEventListener("change", initChange);

			// size change
			function sizeChange() {
				const val = parseInt(document.getElementById("size").value);
				if (val != "" || parseInt(val) < 1) {
					graph.size = parseInt(val);
					setDimensions();
				} else {
					graph.size = 1;
					setDimensions();
				}
			}

			document
				.getElementById("size")
				.addEventListener("change", sizeChange);

			// # of states chages
			function statesChange() {
				graph.states = parseInt(
					document.getElementById("states").value
				);
				if (graph.styleType == "BW") {
					setStyle();
				}
				setRule();
				begin();
			}
			document
				.getElementById("states")
				.addEventListener("change", statesChange);

			document.getElementById("add").addEventListener("click", () => {
				let image = cnv.canvas.toDataURL("image/png");
				this.file = image;
				this.rule = graph.ruleNum.toString();
				this.initialType = graph.initialType;
				this.numOfStates = graph.states;
				this.size = graph.size;
				this.colors = graph.colors;
				this.upload();
			});
		};

		this.sketchInstance = new p5(sketch);
	},
	created() {
		this.getWorlds();
	},
	methods: {
		async upload() {
			try {
				await axios.post("/api/worlds", {
					file: this.file,
					fileId: uuidv4(),
					rule: this.rule,
					initialType: this.initialType,
					numOfStates: this.numOfStates,
					size: this.size,
					colors: this.colors,
				});
				this.file = null;
				this.getWorlds();
				// this.$emit("uploadFinished");
			} catch (error) {
				this.error = "Error: " + error.response.data.message;
			}
		},
		async getWorlds() {
			try {
				let response = await axios.get("/api/worlds");
        		this.worlds = response.data;
        		console.log(this.worlds);
			} catch (error) {
				this.error = "Error: " + error.response.data.message;
			}
		},
	},
};
</script>

<style scoped>
.cellular-automata {
	box-sizing: border-box;
	max-width: 1500px;
	margin: auto;
	padding: 30px 40px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
	gap: 30px;
}

#cc {
	grid-column: span 2;
	/* overflow: scroll; */
}

.btn-group {
	display: flex;
	flex-wrap: wrap;
}

.my-collection {
	margin-top: 0px;
	font-size: 30px;
}

.collection {
	box-sizing: border-box;
	max-width: 1500px;
	margin: auto;
	padding: 30px 40px;
}

canvas {
	margin: auto;
	outline: 3px solid #000;
}

hr {
	margin: 20px 15px;
	border-top: 3px solid #000;
}

.side {
	margin-top: -12px;
	box-sizing: border-box;
	grid-column: span 1;
	font-size: 24px;
}

button {
	color: #000;
	background-color: #f8f8f8;
	border: 2px solid #555;
	padding: 0 10px 0 1 10px;
	margin: 6px;
	font-size: 20px;
	border-radius: 6px;
	font-family: inherit;
	font-weight: 500;
}

button:hover {
	background-color: rgb(241, 241, 241);
}

button:focus {
	outline: none;
}

@media (max-width: 950px) {
	/* CSS that should be displayed if width is equal to or less than 800px goes here */
	.cellular-automata {
		width: min(100vw, 750px);
		grid-template-columns: auto;
		padding: 15px 25px;
		gap: 15px;
	}
	#cc {
		grid-column: span 1;
	}
}

@media (max-width: 540px) {
	/* CSS that should be displayed if width is equal to or less than 800px goes here */
	.cellular-automata {
		padding: 15px 10px 15px 10px;
	}
	#header {
		font-size: 24px;
	}
	p {
		font-size: 18px;
	}
	.row {
		font-size: 20px;
	}
	label {
		font-size: 20px;
	}
	button {
		height: 40px;
		max-width: 90px;
		font-size: 20px;
	}
}

.controls {
	display: flex;
	flex-direction: column;
}

legend {
	font-weight: 600;
	color: rgb(47, 47, 47);
}

fieldset {
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;

	margin: auto;
	max-width: 100%;
	border: 3px solid #000;
	margin-bottom: 15px !important;
	align-content: space-around;
}

#controls {
	justify-content: space-around;
}

#dynamics {
	flex-direction: column;
	justify-content: flex-start;
}

#style {
	flex-direction: column;
	justify-content: flex-start;
}

#colors {
	display: flex;
	flex-wrap: wrap;
	margin: auto;
	flex-direction: column;
	justify-content: flex-start;
}

#curRule {
	width: 100%;
	font-size: 32px;
	border: none;
	font-family: inherit;
	text-align: center;
	color: rgb(47, 47, 47);
	background-color: transparent;
}

#curRule:focus {
	outline: none;
}

#size {
	width: 70px;
	font-family: inherit;
}

fieldset div {
	/* margin-bottom: 5px;
    margin-top: 5px; */
	font-weight: 300 !important;
}

label {
	padding-right: 5px;
	margin-right: 0px;
	font-size: 20px;
	font-weight: 500;
}

.dim {
	font-size: 18px;
	font-family: inherit;
	text-align: center;
	border: 2px solid rgb(47, 47, 47);
	border-radius: 5px;
	color: rgb(47, 47, 47);
}
</style>

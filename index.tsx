import * as ReactDOM from "react-dom"
import * as React from "react"

const width = 100
const height = 640

function paint(
	context: CanvasRenderingContext2D,
	slope: number,
	slopeGrowth: number,
	magnitude: number,
	magnitudeGrowth: number,
	length: number,
	lengthGrowth: number
) {
	context.clearRect(0, 0, width, height)
	context.beginPath()
	context.moveTo(width / 2, 0)

	let y = 0
	const limit = 6
	for (let i = 0; i < limit; i++) {
		let angle = Math.atan(slope)
		const cx1 = width / 2 + Math.sin(angle) * magnitude
		const cy1 = y + Math.cos(angle) * magnitude

		y += length

		slope *= slopeGrowth
		magnitude *= magnitudeGrowth
		length *= lengthGrowth

		angle = Math.atan(slope)
		const cx2 = width / 2 - Math.sin(angle) * magnitude
		const cy2 = y - Math.cos(angle) * magnitude
		context.bezierCurveTo(cx1, cy1, cx2, cy2, width / 2, y)
	}

	context.stroke()
}

function Index({}: {}) {
	const [initialSlope, setInitialSlope] = React.useState(19)
	const [slopeGrowth, setSlopeGrowh] = React.useState(0.41)
	const [initialMagnitude, setInitialMagnitude] = React.useState(35)
	const [magnitudeGrowth, setMagnitudeGrowth] = React.useState(0.75)
	const [initialLength, setInitialLength] = React.useState(6)
	const [lengthGrowth, setLengthGrowth] = React.useState(1.5)

	const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
		null
	)

	const ref = React.useCallback((element: HTMLCanvasElement | null) => {
		if (element === null) {
			return
		}

		const context = element.getContext("2d")
		if (context === null) {
			return
		}

		setContext(context)
	}, [])

	React.useEffect(() => {
		if (context !== null) {
			paint(
				context,
				initialSlope,
				slopeGrowth,
				initialMagnitude,
				magnitudeGrowth,
				initialLength,
				lengthGrowth
			)
		}
	}, [
		context,
		initialSlope,
		slopeGrowth,
		initialLength,
		lengthGrowth,
		initialMagnitude,
		magnitudeGrowth,
	])

	return (
		<>
			<canvas ref={ref} width={width} height={height}></canvas>
			<article>
				Initial slope [1, 72]: <strong>{initialSlope}</strong>
				<br />
				<input
					value={initialSlope}
					onChange={(event) => setInitialSlope(parseInt(event.target.value))}
					type="range"
					min="1"
					max="72"
				/>
				<br />
				Slope decay [0, 1]: <strong>{slopeGrowth}</strong>
				<br />
				<input
					value={slopeGrowth * 100}
					onChange={(event) =>
						setSlopeGrowh(parseInt(event.target.value) / 100)
					}
					type="range"
					min="0"
					max="100"
				/>
				<br />
				Initial magnitude [1, 128]: <strong>{initialMagnitude}</strong>
				<br />
				<input
					value={initialMagnitude}
					onChange={(event) =>
						setInitialMagnitude(parseInt(event.target.value))
					}
					type="range"
					min="1"
					max="128"
				/>
				<br />
				Magnitude decay [0, 1]: <strong>{magnitudeGrowth}</strong>
				<br />
				<input
					value={magnitudeGrowth * 100}
					onChange={(event) =>
						setMagnitudeGrowth(parseInt(event.target.value) / 100)
					}
					type="range"
					min="0"
					max="100"
				/>
				<br />
				Initial period [1, 32]: <span>{initialLength}</span>
				<br />
				<input
					value={initialLength}
					onChange={(event) => setInitialLength(parseInt(event.target.value))}
					type="range"
					min="1"
					max="32"
				/>
				<br />
				Period growth [1, 10]: <span>{lengthGrowth}</span>
				<br />
				<input
					value={lengthGrowth * 100}
					onChange={(event) =>
						setLengthGrowth(parseInt(event.target.value) / 100)
					}
					type="range"
					min="1"
					max="1000"
				/>
				<br />
			</article>
		</>
	)
}

ReactDOM.render(<Index />, document.querySelector("main"))

import { ContextType, Component } from 'react'
import {
  IdleTimerProvider,
  IdleTimerContext,
  PresenceType
} from 'react-idle-timer'
import './styles.css'

const timeout = 10_000
const promptBeforeIdle = 4_000

interface IChildState {
  remaining: number
}

class Child extends Component<{}, IChildState> {
  static contextType = IdleTimerContext
  context!: ContextType<typeof IdleTimerContext>

  state: IChildState = {
    remaining: 0
  }

  interval: number = 0

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState({
        remaining: Math.ceil(this.context.getRemainingTime() / 1000)
      })
    }, 500)
  }

  componentWillUnmount(): void {
    clearInterval(this.interval)
  }

  render() {
    const timeTillPrompt = Math.max(
      this.state.remaining - promptBeforeIdle / 1000,
      0
    )
    const seconds = timeTillPrompt > 1 ? 'seconds' : 'second'

    if (timeTillPrompt > 0) {
      return (
        <p>
          {timeTillPrompt} {seconds} until prompt
        </p>
      )
    }

    return null
  }
}

interface IPromptProps {
  open: boolean
}

interface IPromptState {
  remaining: number
}

class Prompt extends Component<IPromptProps, IPromptState> {
  static contextType = IdleTimerContext
  context!: ContextType<typeof IdleTimerContext>

  state: IPromptState = {
    remaining: 0
  }

  interval: number = 0

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState({
        remaining: Math.ceil(this.context.getRemainingTime() / 1000)
      })
    }, 500)
  }

  componentWillUnmount(): void {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div
        className='modal'
        style={{
          display: this.props.open ? 'flex' : 'none'
        }}
      >
        <h3>Are you still here?</h3>
        <p>Logging out in {this.state.remaining} seconds</p>
        <button onClick={this.context.activate}>Im still here</button>
      </div>
    )
  }
}

interface IAppState {
  state: string
  count: number
  open: boolean
}

export default class App extends Component<{}, IAppState> {
  state: IAppState = {
    state: 'Active',
    count: 0,
    open: false
  }

  constructor(props: {}) {
    super(props)
    this.onPresenceChange = this.onPresenceChange.bind(this)
    this.onPrompt = this.onPrompt.bind(this)
    this.onIdle = this.onIdle.bind(this)
    this.onActive = this.onActive.bind(this)
    this.onAction = this.onAction.bind(this)
  }

  onPresenceChange(presence: PresenceType) {
    const isIdle = presence.type === 'idle'
    const isPrompted = presence.type === 'active' && presence.prompted
    const isActive = presence.type === 'active' && !presence.prompted

    console.log({ isIdle, isPrompted, isActive })
  }

  onPrompt() {
    this.setState({
      state: 'Prompted',
      open: true
    })
  }

  onIdle() {
    this.setState({
      state: 'Idle',
      open: false
    })
  }

  onActive() {
    this.setState({
      state: 'Active',
      open: false
    })
  }

  onAction() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    const { state, count, open } = this.state
    return (
      <IdleTimerProvider
        timeout={timeout}
        promptBeforeIdle={promptBeforeIdle}
        throttle={500}
        onPresenceChange={this.onPresenceChange}
        onPrompt={this.onPrompt}
        onIdle={this.onIdle}
        onActive={this.onActive}
        onAction={this.onAction}
      >
        <h1>React Idle Timer</h1>
        <h2>Functional Context Provider</h2>
        <br />
        <p>Current State: {state}</p>
        <p>Action Events: {count}</p>
        <Child />
        <Prompt open={open} />
      </IdleTimerProvider>
    )
  }
}

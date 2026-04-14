import { Button } from '@rollout/ui-kit'

const APP_TITLE = 'Rollout UI Demo'
const APP_DESCRIPTION =
  'Welcome! This is a minimal landing page that demonstrates our UI components.'

const App = () => {
  return (
    <main className="landing">
      <h1 className="landing__title">{APP_TITLE}</h1>
      <p className="landing__description">{APP_DESCRIPTION}</p>
      <Button>Explore components</Button>
    </main>
  )
}

export default App

import Button from '../components/Button.jsx'
import { notFoundContent } from '../data/pageContent.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle(notFoundContent.title)

  return (
    <section className="py-24 sm:py-32" data-testid="not-found">
      <div className="container-page max-w-xl text-center">
        <p className="font-display text-7xl font-extrabold text-mint-deep sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{notFoundContent.title}</h1>
        <p className="mt-4 text-muted">{notFoundContent.body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 min-[400px]:flex-row">
          <Button to="/" variant="dark">
            Back to Home
          </Button>
          <Button to="/projects" variant="outline">
            View Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

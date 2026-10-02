import { useEffect } from 'react'
import { organization } from '../data/organization.js'

export default function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${organization.name}` : `${organization.name} — ${organization.tagline}`
  }, [pageTitle])
}

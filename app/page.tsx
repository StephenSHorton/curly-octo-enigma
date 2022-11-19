"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then(console.log)
  }, [])
  return (
    <div>
      <div>Yea yea</div>
      <p>
        Amet et ipsum sint do. Laboris duis eu laborum mollit incididunt officia
        fugiat eiusmod Lorem cupidatat id. Ut ad et proident pariatur voluptate
        proident ullamco nulla.
      </p>
      <p>
        Amet et ipsum sint do. Laboris duis eu laborum mollit incididunt officia
        fugiat eiusmod Lorem cupidatat id. Ut ad et proident pariatur voluptate
        proident ullamco nulla.
      </p>
      <p>
        Amet et ipsum sint do. Laboris duis eu laborum mollit incididunt officia
        fugiat eiusmod Lorem cupidatat id. Ut ad et proident pariatur voluptate
        proident ullamco nulla.
      </p>
      <p>
        Amet et ipsum sint do. Laboris duis eu laborum mollit incididunt officia
        fugiat eiusmod Lorem cupidatat id. Ut ad et proident pariatur voluptate
        proident ullamco nulla.
      </p>
    </div>
  )
}

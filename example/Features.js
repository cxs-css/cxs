
import React from 'react'
import cxs from 'cxs'
import Box from './Box'
import { breakpoints } from './config'

const Feature = ({ title, description }) => (
  <Box className={cx.feature}>
    <h3>{title}</h3>
    <p>{description}</p>
  </Box>
)

const features = [
  {
    title: 'Atomic Rulesets',
    description: ''
  },
  {
    title: 'Deduplication',
    description: ''
  },
  {
    title: 'Dead Code Elimination',
    description: ''
  },
  {
    title: 'Framework Agnostic',
    description: ''
  },
]

export default () => (
  <section className={cx.root}>
    {features.map((f, i) => (
      <Feature key={i} {...f} />
    ))}
  </section>
)

const cx = {
  root: cxs({
    display: 'flex',
    flexWrap: 'wrap',
  }),
  feature: cxs({
    width: '100%',
    [breakpoints[0]]: {
      width: '50%'
    }
  })
}


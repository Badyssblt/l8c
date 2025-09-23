import { Component, DefineComponent } from "vue"

export type Param = {
  key: string
  label?: string
  type?: string
  component?: string | Component
  value?: string | number | boolean | string[]
}

import React, { ReactNode } from "react"

export type ResourceType = 'string' | 'number' | 'link' | 'enum' | 'date' | 'money' | 'boolean' | "array"

export interface BaseResourceOption {
  type: ResourceType
  field: string
  width?: number
  header?: string
  nested?: boolean
  sortable?: boolean
  filterable?: boolean
}
export interface ResourceStringOption extends BaseResourceOption {
  type: 'string'
}
export interface ResourceArrayOption extends BaseResourceOption {
  type: 'array',
  mapFunction: (val: any, idx: number) => ReactNode
}

export interface ResourceBooleanOption extends BaseResourceOption {
  type: 'boolean'
  trueLabel?: string
  falseLabel?: string
}

export interface ResourceNumberOption extends BaseResourceOption {
  type: 'number'
  precision?: number
}

export interface ResourceLinkOption extends BaseResourceOption {
  type: 'link'
  linkField?: string
  prefix?: string
  suffix?: string
}

export interface ResourceEnumOption extends BaseResourceOption {
  type: 'enum'
  enum: { [key: string]: string | number }
}

export interface ResourceDateOption extends BaseResourceOption {
  type: 'date'
}
export interface ResourceMoneyOption extends BaseResourceOption {
  type: 'money'
  precision?: number
  prefix?: string
  multiplier?: number
}

export type ResourceTableColumn =
  | ResourceArrayOption
  | ResourceNumberOption
  | ResourceLinkOption
  | ResourceEnumOption
  | ResourceDateOption
  | ResourceMoneyOption
  | ResourceStringOption
  | ResourceBooleanOption
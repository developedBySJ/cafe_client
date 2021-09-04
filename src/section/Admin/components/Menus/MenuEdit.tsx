import React from 'react'
import { ResourceFactory } from '../../../../lib/components/EditResource'

export const MenuEdit = () => {
  return (
    <div>
      <ResourceFactory
        title="Menu"
        config={[
          { id: 'id', label: 'ID', type: 'text', disabled: true },
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'isActive', label: 'Is Active?', type: 'boolean' },
          { id: 'image', label: 'Image', type: 'image' },
        ]}
        initialValues={{ id: 'sdh3232-bb2uyg-23hbasd-121yh1n' }}
      />
    </div>
  )
}

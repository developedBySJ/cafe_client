import React from 'react'
import { ResourceFactory } from '../../../../lib/components/EditResource'

export const MenuCreate = () => {
  return (
    <div>
      <ResourceFactory
        title="New Menu"
        config={[
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'isActive', label: 'Is Active?', type: 'boolean' },
          { id: 'image', label: 'Image', type: 'image' },
        ]}
        initialValues={{}}
      />
    </div>
  )
}

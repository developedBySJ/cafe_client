import React from 'react'
import { ResourceFactory } from '../../../../lib/components/EditResource'

export const ReviewEdit = () => {
  return (
    <div>
      <ResourceFactory
        title="Edit Review"
        config={[{ id: 'id', label: 'ID', type: 'text', disabled: true }]}
        initialValues={{ id: 'sdh3232-bb2uyg-23hbasd-121yh1n' }}
      />
    </div>
  )
}

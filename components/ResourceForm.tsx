import * as React from 'react'
import ResourceType from '../types/ResourceType'

export interface ResourceState {
  id?: string
  name: string,
  links: {
    resourceType: ResourceType,
    url: string
  }[]
}

export interface ResourceFormProps {
  create?: boolean
  state: ResourceState,
  onChange(state: ResourceState)
  onSubmit?()
}

const ResourceForm: React.FC<ResourceFormProps> = ({ create = false, state, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div className="mb-2">
        <label htmlFor="resource-name" className="mr-2">Name</label>
        <input
          id="resource-name"
          name="name"
          type="text"
          className="border w-96"
          value={state.name}
          onChange={e => onChange({ ...state, name: e.target.value })}
        />
      </div>
      { 
        state.links.map((link, i) => (
          <div>
            <div className="mb-2">
              <label htmlFor="resource-url" className="mr-2">URL</label>
              <input
                id="resource-url"
                name="url"
                type="text"
                className="border w-96"
                value={link.url}
                onChange={e => {
                  const links = state.links.slice()
                  links[i] = {
                    ...links[i],
                    url: e.target.value
                  }
                  onChange({ ...state, links })
                }}
              />
              <button
                type="button"
                className="h-10 ml-2"
                onClick={() => {
                  const links = state.links.slice()
                  links.splice(i, 1)
                  onChange({ ...state, links })
                }}
              >
                Remove Link
              </button>
            </div>
            <div className="mb-2">
              <label htmlFor="resource-type" className="mr-2">Resource Type</label>
              <select
                id="resource-type"
                className="border"
                name="resourceType"
                value={link.resourceType}
                onChange={e => {
                  const links = state.links.slice()
                  links[i] = {
                    ...links[i],
                    resourceType: e.target.value as ResourceType
                  }
                  onChange({ ...state, links })
                }}
              >
                <option value="video">video</option>
                <option value="audio">audio</option>
                <option value="text">text</option>
              </select>
            </div>
          </div>
        ))
      }
      <div className="mb-2">
        <button
          type="button"
          className="h-10"
          onClick={() => onChange({
            ...state,
            links: [...state.links, { resourceType: ResourceType.Video, url: '' }]
          })}
        >
          + Add Link
        </button>
      </div>
      <button
        type="submit"
        className="bg-black rounded text-white py-2 px-4 border-2 border-black
        focus:bg-white focus:text-black"
      >
        { create ? 'Create Resource' : 'Update Resource'}
      </button>
    </form>
  )
}

export default ResourceForm
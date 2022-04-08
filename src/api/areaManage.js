import request from '@/utils/request'

const addArea = (data) => {
  return request({
    url: '/api/area',
    method: 'POST',
    data
  })
}

const getAllArea = (data) => {
  return request({
    url: '/api/area',
    method: 'GET',
    params: data
  })
}

const deleteArea = (data) => {
  return request({
    url: 'api/area',
    method: 'DELETE',
    data
  })
}

const updateArea = (data) => {
  return request({
    url: '/api/area',
    method: 'PUT',
    data
  })
}

export {
  addArea,
  getAllArea,
  deleteArea,
  updateArea
}

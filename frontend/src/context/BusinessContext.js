import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const BusinessContext = createContext()
const API_URL = 'http://localhost:8000/api'

export const BusinessProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState([])
  const [employees, setEmployees] = useState([])
  const [curCompany, setCurCompany] = useState({})
  const [curEmployee, setCurEmployee] = useState({})

  useEffect(() => {
    // getCompanies()
  }, [])

  // Get companies
  const getCompanies = async (keywords = '') => {
    setIsLoading(true)
    const { data } = await axios.get(`${API_URL}/companies/${keywords}`)
    setCompanies(data)
    setIsLoading(false)
  }
  // Get company
  const getOneCompany = async (id) => {
    setIsLoading(true)
    // console.log(id)
    const { data } = await axios.get(`${API_URL}/companies/${id}`)
    setCurCompany(data)
    setIsLoading(false)
  }


  const newCompany = async (company_info) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post(`${API_URL}/companies/create/`, company_info)
    }
    catch (error) {
    }
    setIsLoading(false)
  }
  const updateCompany = async (company_info, id) => {
    setIsLoading(true)
    try {
      const { data } = await axios.put(`${API_URL}/companies/update/${id}/`, company_info)
    }
    catch (error) {
    }
    setIsLoading(false)
  }

  const deleteCompany = async (id) => {
    setIsLoading(true)
    // console.log(id)
    const { data } = await axios.delete(`${API_URL}/companies/delete/${id}`)
    setIsLoading(false)
  }

  // Get employees
  const getEmployees = async (keywords = '') => {
    setIsLoading(true)
    const { data } = await axios.get(`${API_URL}/employees/${keywords}`)
    setEmployees(data)
    setIsLoading(false)
  }
  return (
    <BusinessContext.Provider
      value={{
        isLoading,
        companies,
        curCompany,
        employees,
        getCompanies,
        newCompany,
        getOneCompany,
        deleteCompany,
        updateCompany,
        getEmployees,
      }}
    >
      {children}
    </BusinessContext.Provider>
  )
}

export default BusinessContext
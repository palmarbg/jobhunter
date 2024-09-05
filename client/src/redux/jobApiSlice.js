import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:3030'

const getQuery = (builder, url, paramBuilder) => builder.query({
  query: ({token, params}) => {
    return {
      url: (paramBuilder === undefined) ? url : paramBuilder(url, params),
      method: 'GET',
      ...((token === undefined) ? {} : {headers: {Authorization: token}})
    }
  }
})

const postQuery = (builder, url, method, paramBuilder) => builder.mutation({
  query: ({body, token, params}) => {
    return {
      url: (paramBuilder === undefined) ? url : paramBuilder(url, params),
      method: method || 'POST',
      body,
      ...((token === undefined) ? {} : {headers: {Authorization: token}})
    }
  },
})

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({minsalary, maxsalary, jobtype, location, ishomeoffice}) => 
        {
          let url = 'jobs?$limit=9999' + 
            ((isNaN(minsalary + '') || minsalary === '') ? '' : `&salaryFrom[$gte]=${minsalary}`) +
            ((isNaN(maxsalary + '') || maxsalary === '') ? '' : `&salaryTo[$lte]=${maxsalary}`) +
            ((jobtype === null || jobtype === '') ? '' : `&type=${jobtype}`) +
            ((location === null || location === '') ? '' : `&city=${location}`) + 
            (ishomeoffice ? '&homeOffice=true' : '')
          // console.log(url)
          return url
        }
    }),
    registerUser: postQuery(builder, 'users'),
    loginUser: postQuery(builder, 'authentication'),
    getExperiences: getQuery(builder, 'experiences'),
    getUserInfo: getQuery(builder, 'users', (url, params) => `${url}/${params.id}`),
    addExperiences: postQuery(builder, 'experiences'),
    removeExperiences: postQuery(builder, 'experiences', 'DELETE'),
    getJob: getQuery(builder, 'jobs', (url, params) => `${url}/${params.id}`),
    addJobApplication: postQuery(builder, 'applicants'),
    getJobsByUserId: getQuery(builder, 'jobs', (url, params) => `${url}/?userId=${params.userId}`),
    getJobApplicants: getQuery(builder, 'applicants', (url, params) => `${url}?jobId=${params.jobId}`),
    addJob: postQuery(builder, 'jobs'),
    patchJob: postQuery(builder, 'jobs', 'PATCH', (url, params) => `${url}/${params.id}`),
    deleteJob: postQuery(builder, 'jobs', 'DELETE', (url, params) => `${url}/${params.id}`),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetJobsQuery,
  useGetExperiencesQuery,
  useGetUserInfoQuery,
  useAddExperiencesMutation,
  useRemoveExperiencesMutation,
  useGetJobQuery,
  useAddJobApplicationMutation,
  useGetJobsByUserIdQuery,
  useGetJobApplicantsQuery,
  useAddJobMutation,
  usePatchJobMutation,
  useDeleteJobMutation,
} = jobApi
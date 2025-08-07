import { rqClient } from '@/shared/api/instance'
import { queryClient } from '@/shared/api/query-client'
import { ApiSchemas } from '@/shared/api/schema'

export const useDepartmentCreate = () => {
    const departmentMutation = rqClient.useMutation("post", "/api/v1/departments", {
        onSettled: async () => {
            await queryClient.invalidateQueries(rqClient.queryOptions("get", "/api/v1/departments/get_all"))
        }
    })

    const createDepartment = async (data: ApiSchemas["DepartmentCreate"]) => {
        try {
            await departmentMutation.mutateAsync({body: data})
            return true
        }
        catch {
            return false
        }
    }

    return {
        createDepartment, 
        isPending: departmentMutation.isPending
    }
}

import { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteParams } from 'react-admin';
import { stringify } from 'query-string';
import { httpClient } from '../services/httpClient';
import { ApiResponse, PaginationParams, SortParams, FilterParams } from '../types';

// Clean data provider implementation following React Admin interface
class AdminDataProvider implements DataProvider {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getList(resource: string, params: GetListParams) {
    const { page, perPage } = params.pagination || { page: 1, perPage: 25 };
    const { field, order } = params.sort || { field: 'id', order: 'ASC' };
    const filter = params.filter || {};

    const query = this.buildQuery({
      pagination: { page, perPage },
      sort: { field, order: order as 'ASC' | 'DESC' },
      filter,
    });

    const url = `${this.baseUrl}/admin/${resource}?${query}`;
    
    try {
      const response = await httpClient.get<ApiResponse<any[]>>(url);
      
      return {
        data: response.data || [],
        total: response.total || 0,
      };
    } catch (error) {
      throw new Error(`Failed to fetch ${resource}: ${error}`);
    }
  }

  async getOne(resource: string, params: GetOneParams) {
    const url = `${this.baseUrl}/admin/${resource}/${params.id}`;
    
    try {
      const response = await httpClient.get<ApiResponse<any>>(url);
      return { data: response.data };
    } catch (error) {
      throw new Error(`Failed to fetch ${resource} with id ${params.id}: ${error}`);
    }
  }

  async getMany(resource: string, params: { ids: any[] }) {
    const query = stringify({ ids: params.ids });
    const url = `${this.baseUrl}/admin/${resource}?${query}`;
    
    try {
      const response = await httpClient.get<ApiResponse<any[]>>(url);
      return { data: response.data || [] };
    } catch (error) {
      throw new Error(`Failed to fetch multiple ${resource}: ${error}`);
    }
  }

  async getManyReference(resource: string, params: any) {
    const { page, perPage } = params.pagination || { page: 1, perPage: 25 };
    const { field, order } = params.sort || { field: 'id', order: 'ASC' };
    const filter = { ...params.filter, [params.target]: params.id };

    const query = this.buildQuery({
      pagination: { page, perPage },
      sort: { field, order: order as 'ASC' | 'DESC' },
      filter,
    });

    const url = `${this.baseUrl}/admin/${resource}?${query}`;
    
    try {
      const response = await httpClient.get<ApiResponse<any[]>>(url);
      
      return {
        data: response.data || [],
        total: response.total || 0,
      };
    } catch (error) {
      throw new Error(`Failed to fetch ${resource} references: ${error}`);
    }
  }

  async create(resource: string, params: CreateParams) {
    const url = `${this.baseUrl}/admin/${resource}`;
    
    try {
      const response = await httpClient.post<ApiResponse<any>>(url, params.data);
      return { data: response.data };
    } catch (error) {
      throw new Error(`Failed to create ${resource}: ${error}`);
    }
  }

  async update(resource: string, params: UpdateParams) {
    const url = `${this.baseUrl}/admin/${resource}/${params.id}`;
    
    try {
      const response = await httpClient.put<ApiResponse<any>>(url, params.data);
      return { data: response.data };
    } catch (error) {
      throw new Error(`Failed to update ${resource}: ${error}`);
    }
  }

  async updateMany(resource: string, params: { ids: any[]; data: any }) {
    const promises = params.ids.map(id =>
      httpClient.put<ApiResponse<any>>(`${this.baseUrl}/admin/${resource}/${id}`, params.data)
    );
    
    try {
      await Promise.all(promises);
      return { data: params.ids };
    } catch (error) {
      throw new Error(`Failed to update multiple ${resource}: ${error}`);
    }
  }

  async delete(resource: string, params: DeleteParams) {
    const url = `${this.baseUrl}/admin/${resource}/${params.id}`;
    
    try {
      const response = await httpClient.delete<ApiResponse<any>>(url);
      return { data: response.data };
    } catch (error) {
      throw new Error(`Failed to delete ${resource}: ${error}`);
    }
  }

  async deleteMany(resource: string, params: { ids: any[] }) {
    const promises = params.ids.map(id =>
      httpClient.delete(`${this.baseUrl}/admin/${resource}/${id}`)
    );
    
    try {
      await Promise.all(promises);
      return { data: params.ids };
    } catch (error) {
      throw new Error(`Failed to delete multiple ${resource}: ${error}`);
    }
  }

  private buildQuery(params: {
    pagination: PaginationParams;
    sort: SortParams;
    filter: FilterParams;
  }): string {
    const { pagination, sort, filter } = params;
    
    return stringify({
      page: pagination.page,
      per_page: pagination.perPage,
      sort_field: sort.field,
      sort_order: sort.order.toLowerCase(),
      ...filter,
    });
  }
}

// Export configured data provider
export const dataProvider = new AdminDataProvider('');

import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpRequestService {
  async execute<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const res = await axios(config);
      return res.data as T;
    } catch (e) {
      console.log(e.response.data)
      throw new BadRequestException(e.message)
    }
  }
}
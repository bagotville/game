import { AxiosInstance } from 'axios';
import http from '../utils/axios/axios.service';

export default abstract class BaseAPI {
  protected http: AxiosInstance;

  public constructor() {
    this.http = http;
  }
}

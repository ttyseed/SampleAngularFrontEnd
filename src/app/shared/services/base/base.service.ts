import { environment } from "src/app/environments/environment";


export class BaseService {
  protected api = environment.apiUrl;
}

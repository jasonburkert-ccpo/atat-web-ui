import { FundingRequestMIPRFormDTO} from "../models";
import { TableApiBase } from "../tableApiBase";
const TABLENAME = "x_g_dis_atat_funding_request_fs_form";
export class FundingRequestMIPRFormApi extends TableApiBase<FundingRequestMIPRFormDTO> {
  constructor() {
    super(TABLENAME);
  }

}
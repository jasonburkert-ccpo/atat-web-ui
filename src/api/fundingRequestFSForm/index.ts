import {FundingRequestFSFormDTO } from "../models";
import { TableApiBase } from "../tableApiBase";
const TABLENAME = "x_g_dis_atat_funding_request_mipr";
export class FundingRequestFSFormApi extends TableApiBase<FundingRequestFSFormDTO> {
  constructor() {
    super(TABLENAME);
  }
}

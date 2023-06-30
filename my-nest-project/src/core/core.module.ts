import { Module, Global } from "@nestjs/common";
import { HttpRequestService } from "./services/http-request.service";

@Global()
@Module({
  providers: [HttpRequestService],
  exports: [HttpRequestService]
})

export class CoreModule {}
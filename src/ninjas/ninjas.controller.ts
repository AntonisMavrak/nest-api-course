import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query, UseGuards, ValidationPipe
} from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { UpdateNinjaDto } from "./dto/update-ninja.dto";
import { NinjasService } from "./ninjas.service";
import { BeltGuard } from "../belt/belt.guard";

@Controller("ninjas")
export class NinjasController {

  constructor(private readonly ninjasService: NinjasService) {
  }

  @Get()
  getNinjas(@Query("weapon") weapon: "shuriken" | "katana" | "nunchaku") {
    return this.ninjasService.getNinjas(weapon);
  }

  @Get(":id")
  getOneNinja(@Param("id", ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getOneNinja(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(":id")
  updateNinja(@Param("id", ParseIntPipe) id: number, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(id, updateNinjaDto);
  }

  @Delete(":id")
  removeNinja(@Param("id", ParseIntPipe) id: number) {
    return this.ninjasService.removeNinja(id);
  }
}
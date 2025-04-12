import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { FlavorsService } from './flavors.service';

@Controller('flavors')
export class FlavorsController {
  constructor(private readonly flavorsService: FlavorsService) {}

  @Post()
  create(@Body() createFlavorDto: CreateFlavorDto) {
    return this.flavorsService.create(createFlavorDto);
  }

  @Get()
  findAll() {
    return this.flavorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const flavor = await this.flavorsService.findOne(id);
    if (!flavor) throw new HttpException('Flavor not found', 404);
    return flavor;
  }

  @Get()
  async findByIds(@Query('ids') ids: string[]) {
    const flavors = await this.flavorsService.findByIds(ids);
    if (!flavors) throw new HttpException('Product not found', 404);
    return flavors;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFlavorDto: UpdateFlavorDto) {
    const updatedFlavor = await this.flavorsService.update(id, updateFlavorDto);
    if (!updatedFlavor) throw new HttpException('Flavor not found', 404);

    return updatedFlavor;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedFlavor = await this.flavorsService.remove(id);
    if (!deletedFlavor) throw new HttpException('Product not found', 404);
    return deletedFlavor;
  }
}

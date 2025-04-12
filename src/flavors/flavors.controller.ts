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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';
import { FlavorsService } from './flavors.service';

@Controller('flavors')
export class FlavorsController {
  constructor(private readonly flavorsService: FlavorsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createFlavorDto: CreateFlavorDto) {
    return this.flavorsService.create(createFlavorDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.flavorsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    const flavor = await this.flavorsService.findOne(id);
    if (!flavor) throw new HttpException('Flavor not found', 404);
    return flavor;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findByIds(@Query('ids') ids: string[]) {
    const flavors = await this.flavorsService.findByIds(ids);
    if (!flavors) throw new HttpException('Product not found', 404);
    return flavors;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateFlavorDto: UpdateFlavorDto) {
    const updatedFlavor = await this.flavorsService.update(id, updateFlavorDto);
    if (!updatedFlavor) throw new HttpException('Flavor not found', 404);

    return updatedFlavor;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    const deletedFlavor = await this.flavorsService.remove(id);
    if (!deletedFlavor) throw new HttpException('Product not found', 404);
    return deletedFlavor;
  }
}

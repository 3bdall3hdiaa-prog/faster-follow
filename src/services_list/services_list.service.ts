import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicesListDocument } from './services_list.schema';
import axios from 'axios';
import { ManagePlatformsDocument } from 'src/manageplatforms/schema';
import { CreateServicesListDto } from './dto/create-services_list.dto';
@Injectable()
export class ServicesListService {
  constructor(@InjectModel('ServicesList') private readonly servicesListModel: Model<ServicesListDocument>, @Inject('CLOUDINARY') private cloudinary: any,
    @InjectModel('ManagePlatforms') private readonly managePlatform: Model<ManagePlatformsDocument>,
  ) { }
  async create(createServicesListDto: CreateServicesListDto, file: any) {
    console.log(createServicesListDto)
    if (!createServicesListDto) throw new HttpException('data is required', 404);
    const { provider, services } = createServicesListDto;
    if (services) {
      const addService = Promise.all(services.map(async (el: any) => {
        await this.servicesListModel.create({
          provider,
          providerServiceId: el.service,
          title: el.name,
          price: Number(el.rate) * 1.2,
          providerRate: el.rate,
          min: el.min,
          max: el.max,
          platform: el.category,
          refill: el.refill,
        });
      }))
      await addService

      return { message: "added successfully", status: 200 }
    }
    if (!services) {
      const check = await this.servicesListModel.findOne({ providerServiceId: createServicesListDto.providerServiceId });
      if (check) throw new HttpException('service already exist', 404);
      let addService;
      if (file) addService = { ...createServicesListDto, image: { url: file.url, public_id: file.public_id } }
      else addService = { ...createServicesListDto };
      await this.servicesListModel.create(addService);
      return { message: "added successfully", status: 200 }
    }
  }

  async findAll() {
    const data = await this.servicesListModel.find().populate('provider');
    return data
  }



  async update(id: string, updateServicesListDto: any, file: any) {
    const check = await this.servicesListModel.findById(id);

    if (!check) {
      throw new HttpException("service not found", 404);
    }

    let form = { ...updateServicesListDto };

    if (file) {
      form.image = {
        url: file.url,
        public_id: file.public_id,
      };
    }

    // تحويل الخصومات إلى معامل
    const discounts = JSON.parse(updateServicesListDto.discounts);
    if (Array.isArray(discounts)) {
      form.discounts = discounts.map((item: any) => ({
        from: Number(item.from),
        to: Number(item.to),
        discount: (100 - Number(item.discount)) / 100,
      }));
    }

    const update = await this.servicesListModel.findOneAndUpdate(
      { _id: id },
      form,
      { new: true }
    );

    return update;
  }

  async remove(id: string) {
    const check = await this.servicesListModel.findById(id);
    if (!check) throw new HttpException("user not found", 404);
    if (check.image) {
      if (check.image.public_id) await this.cloudinary.uploader.destroy(check.image.public_id);
    }
    await this.servicesListModel.findOneAndDelete({ _id: id });
    return { message: "deleted successfully", status: 200 }
  }
  async getdata(query: { key: string, apiEndpoint: string, page: number }) {
    const data = await axios.post(query.apiEndpoint, {
      key: `${query.key}`,
      action: "services"
    });
    let limit = 50;
    let p = query.page - 1;
    let skip = p * limit;
    const length = Math.ceil(data.data.length / limit);
    const result = data.data.slice(skip, (p + 1) * limit);
    return {
      data: result,
      length: length
    }
  }
  async getOne(data: any) {
    const platforms = await this.managePlatform.find();
    const platform = platforms.find((el: any) => el.slug === data.slug);

    if (!platform) {
      throw new HttpException("Platform not found", 404);
    }

    const filterServices = await this.servicesListModel.find({
      platform: {
        $regex: platform.name,
        $options: "i",
      },
    });

    return {
      data: filterServices,
      length: filterServices.length,
      message: "success",
      status: 200,
    };
  }
  async getService(id: string) {
    if (!id) throw new HttpException("id not provided", 404);
    const data = await this.servicesListModel.findById({ _id: id }).populate('provider');
    if (!data) throw new HttpException("service not found", 404);

    return data
  }

  async refill(data: { order: string, key: string, apiEndpoint: string }) {
    if (!data.order) throw new HttpException("orderId not provided", 404);
    const res = await axios.post(data.apiEndpoint, {
      key: data.key,
      action: 'refill',
      order: data.order
    });
    if (res.data.status !== 'success') throw new HttpException(res.data.message, 404);
    const refillData = res.data;
    if (!refillData) throw new HttpException("service not found", 404);
    return refillData
  }








  // async getTotalPrice(data: { serviceId: string, quantity: number }) {
  //   const { quantity } = data
  //   if (!data.serviceId || !data.quantity) throw new HttpException("serviceId and quantity are required", 404);
  //   const Service: any = await this.servicesListModel.findById({ _id: data.serviceId });
  //   if (!Service) throw new HttpException("service not found", 404);

  //   let totalCost = 0;
  //   const setTotalCost = (cost: number) => {
  //     totalCost = cost;
  //   }

  //   if (quantity <= 0) {
  //     setTotalCost(0);
  //     return
  //   }

  //   const cost = (quantity / 1000) * Service.price;

  //   if (quantity === 1000 && Service.discount_for_1000) {
  //     setTotalCost(cost * Service.discount_for_1000);
  //   } else if (quantity === 2000 && Service.discount_for_2000) {
  //     setTotalCost(cost * Service.discount_for_2000);
  //   } else if (quantity === 3000 && Service.discount_for_3000) {
  //     setTotalCost(cost * Service.discount_for_3000);
  //   } else if (quantity === 4000 && Service.discount_for_4000) {
  //     setTotalCost(cost * Service.discount_for_4000);
  //   } else if (quantity > 4000 && quantity < 100000 && Service.discount_for_greater_than_4000) {
  //     for (let i = 5000; i < 100000; i += 1000) {
  //       if (quantity === i) {
  //         setTotalCost(cost * Service.discount_for_greater_than_4000);
  //         break
  //       }
  //       else {
  //         setTotalCost(cost);
  //         continue
  //       }
  //     }
  //   } else if (quantity >= 100000 && Service.discount_for_greater_than_100000) {
  //     for (let i = 100000; i >= 100000; i += 1000) {
  //       if (quantity === i) {
  //         setTotalCost(cost * Service.discount_for_greater_than_100000);
  //         break
  //       }
  //       else {
  //         setTotalCost(cost);
  //         continue
  //       }
  //     }
  //   }
  //   else {
  //     setTotalCost(cost);
  //   }
  //   return totalCost
  // }
}

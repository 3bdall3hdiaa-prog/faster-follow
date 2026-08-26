import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ServicesListDocument } from './services_list.schema';
import axios from 'axios';
import { ManagePlatformsDocument } from 'src/manageplatforms/schema';
import { Counter, CounterDocument } from './counter.schema';
@Injectable()
export class ServicesListService {
  constructor(@InjectModel('ServicesList') private readonly servicesListModel: Model<ServicesListDocument>, @Inject('CLOUDINARY') private cloudinary: any,
    @InjectModel('ManagePlatforms') private readonly managePlatform: Model<ManagePlatformsDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
  ) { }
  async create(createServicesListDto: any, file: any) {
    if (!createServicesListDto) throw new HttpException('data is required', 404);
    const { provider, services } = createServicesListDto;
    if (!services) {
      if (!mongoose.Types.ObjectId.isValid(provider)) throw new HttpException('invalid provider', 404);
      const check = await this.servicesListModel.findOne({ provider, providerServiceId: createServicesListDto.providerServiceId });
      if (check) throw new HttpException('service already exist', 404);
      //starting order with 1000
      const counter = await this.counterModel.findOneAndUpdate(
        { name: 'services' },
        { $inc: { seq: 1 } },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      );

      const idNextService = counter.seq;
      let addService;
      if (file) addService = { ...createServicesListDto, image: { url: file.url, public_id: file.public_id, id: idNextService } }
      else addService = { ...createServicesListDto, id: idNextService };
      const discounts = JSON.parse(createServicesListDto.discounts);
      if (Array.isArray(discounts)) {
        addService.discounts = discounts.map((item: any) => ({
          from: Number(item.from),
          to: Number(item.to),
          discount: Number(item.discount),
        }));

        await this.servicesListModel.create(addService);
        return { message: "added successfully", status: 200 }
      }
    }

    const addService = Promise.all(services.map(async (el: any) => {
      const counter = await this.counterModel.findOneAndUpdate(
        { name: 'services' },
        { $inc: { seq: 1 } },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      );

      const idNextService = counter.seq;
      await this.servicesListModel.create({
        id: idNextService,
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
        discount: Number(item.discount),
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
  async getdata(query: {
    key: string;
    apiEndpoint: string;
    page: number;
    search: string;
  }) {
    const res = await axios.post(query.apiEndpoint, {
      key: query.key,
      action: 'services',
    });

    let getData = res.data;

    if (query.search) {
      getData = res.data.filter((el: any) =>
        el.title?.includes(query.search),
      );
    }

    const limit = 50;
    const p = query.page - 1;
    const skip = p * limit;

    const length = Math.ceil(getData.length / limit);

    const result = getData.slice(skip, skip + limit);

    return {
      data: result,
      length,
    };
  }
  async getOne(data: any, name: string) {
    const platforms = await this.managePlatform.find();
    const platform = platforms.find((el: any) => el.slug === data.slug);

    if (!platform) {
      throw new HttpException("Platform not found", 404);
    }

    const filterServices = await this.servicesListModel.find({
      status: true,
      $or: [
        {
          platform: {
            $regex: platform.name,
            $options: "i",
          },
        },
        {
          platform: name || platform.name
        }
      ]
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
    const refillData = res.data;
    if (!refillData) throw new HttpException("service not found", 404);
    return refillData
  }

  async getSearch(query: { search: string }) {
    if (query.search && query.search !== '') {
      return await this.servicesListModel.find({
        title: {
          $regex: query.search,
          $options: "i",
        },
      })
    }
    return {}
  }

  async refillStatus(data: { refillId: string, key: string, apiEndpoint: string }) {
    console.log("sacascasc")
    const res = await axios.post(data.apiEndpoint, {
      key: data.key,
      action: 'refill_status',
      refill: data.refillId
    })
    if (!res.data) throw new HttpException("refill not found", 404);
    return res.data
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

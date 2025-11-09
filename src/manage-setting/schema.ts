import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Announcement {
    @Prop({ required: true })
    text: string;

    @Prop({ required: true, default: false })
    isEnabled: boolean;
}

@Schema({ _id: false })
class FeatureItem {
    @Prop({ required: true })
    icon: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;
}

@Schema({ _id: false })
class Features {
    @Prop({ required: true })
    title: string;

    @Prop({ type: [FeatureItem], default: [] })
    items: FeatureItem[];
}

@Schema({ _id: false })
class Hero {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    subtitle: string;

    @Prop()
    cta1: string;

    @Prop()
    cta2: string;
}

@Schema({ _id: false })
class Services {
    @Prop({ required: true })
    title: string;

    @Prop()
    subtitle: string;
}

@Schema({ _id: false })
class Step {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;
}

@Schema({ _id: false })
class HowItWorks {
    @Prop({ required: true })
    title: string;

    @Prop()
    subtitle: string;

    @Prop({ type: [Step], default: [] })
    steps: Step[];
}

@Schema({ _id: false })
class Testimonials {
    @Prop({ required: true })
    title: string;

    @Prop()
    subtitle: string;
}

@Schema({ _id: false })
class HomepageContent {
    @Prop({ type: Hero, required: true })
    hero: Hero;

    @Prop({ type: Features, required: true })
    features: Features;

    @Prop({ type: Services, required: true })
    services: Services;

    @Prop({ type: HowItWorks, required: true })
    howItWorks: HowItWorks;

    @Prop({ type: Testimonials, required: true })
    testimonials: Testimonials;
}

@Schema({ timestamps: true })
export class SiteSettings extends Document {
    @Prop({ required: true })
    siteName: string;

    @Prop()
    logoUrl: string;

    @Prop()
    faviconUrl: string;

    @Prop()
    primaryColor: string;

    @Prop()
    seoTitle: string;

    @Prop()
    seoDescription: string;

    @Prop({ type: Announcement, required: true })
    announcement: Announcement;

    @Prop({ type: HomepageContent, required: true })
    homepageContent: HomepageContent;
}

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings);

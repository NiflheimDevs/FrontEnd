/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Bider {
  teamid: number;
  type: number;
  bid_id: string;
  title: string;
  pre_payment: number;
  total: number;
  expected_time: number;
  profile: string;
  description: string;
}

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

export const formatPriceString = (price: string) => {
  return new Intl.NumberFormat("fa-IR").format(parseInt(price, 0));
};

export interface Tag {
  id: number;
  name: string;
}

export interface Label {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ProjectData {
  project_id: number;
  Owner_id: number;
  title: string;
  description: string;
  label: Label;
  tags: Tag[];
  first_name: string;
  last_name: string;
  username: string;
  duration: string;
  status: number;
}

export interface Team {
  team_id: number;
  title: string;
  description: string;
  profile: string;
  isValid: boolean;
}

export interface BiderSummery {
  bid_id: number;
  team_info: {
    id: number;
    title: string;
    description: string;
    type: number;
    profile: string;
    owner_id: number;
  };
  total: number;
  expected_time: number;
}

export interface FormBiderData {
  team_id: number;
  project_id: number;
  pre_payment?: number;
  total?: number;
  description: string;
  expected_time?: number;
}

export const mapApiDataToProfile = async (apiData: any): Promise<Bider> => {
  return {
    teamid: apiData.team_info.id,
    bid_id: apiData.bid_id,
    title: apiData.team_info?.title,
    description: apiData.team_info?.description,
    profile: apiData.team_info?.profile,
    expected_time: apiData.expected_time,
    total: apiData.total,
    pre_payment: apiData.pre_payment,
    type: apiData.type,
  };
};

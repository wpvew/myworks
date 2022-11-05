import React from 'react';
import VkIcon from '../icons/VkIcon';
import ContactIcon from '../icons/ContactIcon';
import PhoneIcon from '../icons/PhoneIcon';
import FacebookIcon from '../icons/FacebookIcon';
import MainIcon from '../icons/MainIcon';
import PlusIcon from '../icons/PlusIcon';
import CloseIcon from '../icons/CloseIcon';
import ProfileIcon from '../icons/ProfileIcon';
import PenIcon from '../icons/PenIcon';
import ArrowIcon from '../icons/ArrowIcon';
import LogoutIcon from '../icons/LogoutIcon';

export enum EIcons {
  vk = 'VkIcon',
  contact = 'ContactIcon',
  phone = 'PhoneIcon',
  facebook = 'FacebookIcon',
  email = 'MainIcon',
  plus = 'PlusIcon',
  close = 'CloseIcon',
  profile = 'ProfileIcon',
  pen = 'PenIcon',
  arrow = 'ArrowIcon',
  logout = 'LogoutIcon',
}

interface IIconProps {
  name: EIcons;
}
export function Icon({ name }: IIconProps) {
  const iconComponents = {
    VkIcon,
    ContactIcon,
    PhoneIcon,
    FacebookIcon,
    MainIcon,
    PlusIcon,
    CloseIcon,
    ProfileIcon,
    PenIcon,
    ArrowIcon,
    LogoutIcon,
  };
  const IconComponent = iconComponents[name];

  return <IconComponent />;
}

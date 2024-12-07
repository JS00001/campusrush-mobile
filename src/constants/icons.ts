/*
 * Created on Wed Nov 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import ArrowClockwise from 'phosphor-react-native/src/icons/ArrowClockwise';
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft';
import ArrowRight from 'phosphor-react-native/src/icons/ArrowRight';
import ArrowSquareOut from 'phosphor-react-native/src/icons/ArrowSquareOut';
import Bell from 'phosphor-react-native/src/icons/Bell';
import Buildings from 'phosphor-react-native/src/icons/Buildings';
import Calendar from 'phosphor-react-native/src/icons/Calendar';
import Camera from 'phosphor-react-native/src/icons/Camera';
import CaretDown from 'phosphor-react-native/src/icons/CaretDown';
import CaretLeft from 'phosphor-react-native/src/icons/CaretLeft';
import CaretRight from 'phosphor-react-native/src/icons/CaretRight';
import CaretUp from 'phosphor-react-native/src/icons/CaretUp';
import Chat from 'phosphor-react-native/src/icons/Chat';
import ChatCircle from 'phosphor-react-native/src/icons/ChatCircle';
import ChatsCircle from 'phosphor-react-native/src/icons/ChatsCircle';
import Check from 'phosphor-react-native/src/icons/Check';
import CheckSquareOffset from 'phosphor-react-native/src/icons/CheckSquareOffset';
import Circle from 'phosphor-react-native/src/icons/Circle';
import Clock from 'phosphor-react-native/src/icons/Clock';
import Copy from 'phosphor-react-native/src/icons/Copy';
import CheckCircle from 'phosphor-react-native/src/icons/CheckCircle';
import CreditCard from 'phosphor-react-native/src/icons/CreditCard';
import DotsThree from 'phosphor-react-native/src/icons/DotsThree';
import DotsSixVertical from 'phosphor-react-native/src/icons/DotsSixVertical';
import DownloadSimple from 'phosphor-react-native/src/icons/DownloadSimple';
import Envelope from 'phosphor-react-native/src/icons/Envelope';
import Eye from 'phosphor-react-native/src/icons/Eye';
import EyeSlash from 'phosphor-react-native/src/icons/EyeSlash';
import Files from 'phosphor-react-native/src/icons/Files';
import FunnelSimple from 'phosphor-react-native/src/icons/FunnelSimple';
import Gear from 'phosphor-react-native/src/icons/Gear';
import Globe from 'phosphor-react-native/src/icons/Globe';
import Heart from 'phosphor-react-native/src/icons/Heart';
import Hourglass from 'phosphor-react-native/src/icons/Hourglass';
import HouseSimple from 'phosphor-react-native/src/icons/HouseSimple';
import Info from 'phosphor-react-native/src/icons/Info';
import Image from 'phosphor-react-native/src/icons/Image';
import Knife from 'phosphor-react-native/src/icons/Knife';
import Link from 'phosphor-react-native/src/icons/Link';
import List from 'phosphor-react-native/src/icons/List';
import ListBullets from 'phosphor-react-native/src/icons/ListBullets';
import Lock from 'phosphor-react-native/src/icons/Lock';
import MagnifyingGlass from 'phosphor-react-native/src/icons/MagnifyingGlass';
import MapPinSimple from 'phosphor-react-native/src/icons/MapPinSimple';
import PaperPlaneRight from 'phosphor-react-native/src/icons/PaperPlaneRight';
import Paragraph from 'phosphor-react-native/src/icons/Paragraph';
import PencilLine from 'phosphor-react-native/src/icons/PencilLine';
import Person from 'phosphor-react-native/src/icons/Person';
import PersonSimple from 'phosphor-react-native/src/icons/PersonSimple';
import Phone from 'phosphor-react-native/src/icons/Phone';
import Plus from 'phosphor-react-native/src/icons/Plus';
import QrCode from 'phosphor-react-native/src/icons/QrCode';
import QuestionMark from 'phosphor-react-native/src/icons/QuestionMark';
import ShareFat from 'phosphor-react-native/src/icons/ShareFat';
import ShieldCheck from 'phosphor-react-native/src/icons/ShieldCheck';
import SignOut from 'phosphor-react-native/src/icons/SignOut';
import Skull from 'phosphor-react-native/src/icons/Skull';
import SortAscending from 'phosphor-react-native/src/icons/SortAscending';
import Sparkle from 'phosphor-react-native/src/icons/Sparkle';
import Star from 'phosphor-react-native/src/icons/Star';
import Syringe from 'phosphor-react-native/src/icons/Syringe';
import TestTube from 'phosphor-react-native/src/icons/TestTube';
import TextAa from 'phosphor-react-native/src/icons/TextAa';
import Trash from 'phosphor-react-native/src/icons/Trash';
import User from 'phosphor-react-native/src/icons/User';
import UserList from 'phosphor-react-native/src/icons/UserList';
import UserPlus from 'phosphor-react-native/src/icons/UserPlus';
import Users from 'phosphor-react-native/src/icons/Users';
import UsersThree from 'phosphor-react-native/src/icons/UsersThree';
import Warning from 'phosphor-react-native/src/icons/Warning';
import WarningCircle from 'phosphor-react-native/src/icons/WarningCircle';
import WifiHigh from 'phosphor-react-native/src/icons/WifiHigh';
import X from 'phosphor-react-native/src/icons/X';
import XCircle from 'phosphor-react-native/src/icons/XCircle';

export type IconType = keyof typeof Icons | `${keyof typeof Icons}Fill`;

/**
 * Because phosphor icons doesnt fucking support
 * tree shaking, we need to 1-by-1 import the icons
 * we need for the app. Fuck you phosphor.
 */
export const Icons = {
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  Bell,
  Buildings,
  Calendar,
  Camera,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Chat,
  ChatCircle,
  ChatsCircle,
  Check,
  CheckCircle,
  CheckSquareOffset,
  Circle,
  Clock,
  Copy,
  CreditCard,
  DotsThree,
  DotsSixVertical,
  DownloadSimple,
  Envelope,
  Eye,
  EyeSlash,
  Files,
  FunnelSimple,
  Gear,
  Globe,
  Heart,
  Hourglass,
  HouseSimple,
  Info,
  Image,
  Knife,
  Link,
  List,
  ListBullets,
  Lock,
  MagnifyingGlass,
  MapPinSimple,
  PaperPlaneRight,
  Paragraph,
  PencilLine,
  Person,
  PersonSimple,
  Phone,
  Plus,
  QrCode,
  QuestionMark,
  ShareFat,
  ShieldCheck,
  SignOut,
  Skull,
  SortAscending,
  Sparkle,
  Star,
  Syringe,
  TestTube,
  TextAa,
  Trash,
  User,
  UserList,
  UserPlus,
  Users,
  UsersThree,
  Warning,
  WarningCircle,
  WifiHigh,
  X,
  XCircle,
};

export default Icons;

import { Apartment, UserApartment } from '@/types/Data';

class ApartmentText {
  format(apartment: Apartment | UserApartment | null | undefined) {
    if (!apartment) return '-';
    const { number, floor, block } = apartment;
    return `Apto ${number} | Andar: ${floor} | Bloco: ${block}`;
  }
}

const instance = new ApartmentText();
export { instance as ApartmentText };

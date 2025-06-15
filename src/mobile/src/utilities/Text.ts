class Text {
  formatPhone(value: string) {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');

    const ddd = digits.slice(0, 2);
    const phone = digits.slice(2);

    if (digits.length <= 2) {
      return `(${ddd}`;
    }

    if (phone.length <= 4) {
      return `(${ddd}) ${phone}`;
    }

    if (phone.length <= 8) {
      // 8 dígitos: 9999-9999
      return `(${ddd}) ${phone.slice(0, 4)}-${phone.slice(4)}`;
    }

    // 9 dígitos: 99999-9999
    return `(${ddd}) ${phone.slice(0, 5)}-${phone.slice(5, 9)}`;
  }

  onlyDigits(value: string) {
    return value.replace(/\D/g, '');
  }

  toNumber(value: string | number | null | undefined): number {
    if (typeof value === 'number') return value;
    if (!value) return 0;

    const normalized = value
      .toString()
      .replace(/\s/g, '')       // remove espaços
      .replace(/\./g, '')       // remove pontos (milhar)
      .replace(',', '.');       // troca vírgula decimal por ponto

    const parsed = parseFloat(normalized);
    return isNaN(parsed) ? 0 : parsed;
  }

}

export default new Text();

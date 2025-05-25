import { addDays, differenceInMilliseconds, format, parse, parseISO } from 'date-fns';

type FormatParams = {
  date?: Date;
  pattern?: string;
};

class DateUtil {
  defaultFormat = 'yyyy-MM-dd HH:mm:ss';
  getFormattedDate({ date = new Date(), pattern = this.defaultFormat }: FormatParams = {}): string {
    return format(date, pattern);
  }
  convertFormat(date: string, originalFormat: string, targetFormat: string) {
    return format(parse(date, originalFormat, new Date()), targetFormat);
  }
  getRemainingTimeMs(time: string, timeFormat: string = 'HH:mm', considerNextDay: boolean = false) {
    const now = new Date();
    let targetTime = parse(time, timeFormat, now);

    if (considerNextDay) {
      targetTime = addDays(targetTime, 1);
    } else if (targetTime < now) {
      return -1;
    }

    return differenceInMilliseconds(targetTime, now);
  }
  formatISO(date?: string | null, targetFormat: string = 'dd/MM/yyyy') {
    if (!date) return '';
    return format(parseISO(date), targetFormat);
  }
}

const instance = new DateUtil();
export { instance as DateUtil };

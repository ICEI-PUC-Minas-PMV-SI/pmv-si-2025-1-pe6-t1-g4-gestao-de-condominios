class DateUtil {
  prettyTimeStamp(timestamp?: string | undefined | null): string {
    return timestamp ? new Date(timestamp).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) : '';
  }
}

export default new DateUtil();
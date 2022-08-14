export class MonthData {
  constructor(
    monthNameRU,
    monthNameEN,
    monthNumber,
    amountIncoming,
    amountOutgoing
  ) {
    this.monthNameRU = monthNameRU;
    this.monthNameEN = monthNameEN;
    this.monthNumber = monthNumber;
    this.amountTotal = amountIncoming + amountOutgoing;
    this.amountIncoming = amountIncoming;
    this.amountOutgoing = amountOutgoing;
  }
}

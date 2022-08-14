import { el } from 'redom';
import { MonthData } from './MonthData';

class AccountDetails {
  _accountData;
  btnBack = this.getActionBtn().btnBack;
  btnTransfer = this.getActionBtn().btnTransfer;
  inputs = this.getInputs();

  constructor(accountData, page, qtyMonth) {
    this._accountData = accountData;
    this.page = page;
    this.qtyMonth = qtyMonth;
    // this.monthObj = this.getMonths();
    // console.log(this._accountData.account);
  }

  getStyleClasses() {
    const parentClassMain = 'page-account-details';
    const parentClassBlock = 'detail-info-block';
    const parentClassBlockTranslate = 'send-transfer';
    const parentClassBlockBalance = 'dinamic-balance';
    const parentClassBlockHistory = 'history-translates';
    const parentClassGraph = 'graph';

    return {
      parentClassMain,
      parentClassBlock,
      parentClassBlockTranslate,
      parentClassBlockBalance,
      parentClassBlockHistory,
      parentClassGraph,
    };
  }

  getActionBtn() {
    const btnBack = el(
      `button.${this.getStyleClasses().parentClassMain}__btn-back`,
      'Вернуться назад'
    );
    const btnTransfer = el(
      `button.${this.getStyleClasses().parentClassBlockTranslate}__send-btn`,
      'Отправить'
    );

    return { btnBack, btnTransfer };
  }

  getInputs() {
    const inputTransferRecipient = el(
      `input.${this.getStyleClasses().parentClassBlockTranslate}__input`,
      {
        placeholder: 'Введите номер счета',
        id: 'account-recipient',
      }
    );

    const inputTransferAmount = el(
      `input.${this.getStyleClasses().parentClassBlockTranslate}__input`,
      {
        placeholder: 'Введите сумму',
        id: 'amount-transfer',
      }
    );

    const inputs = {
      transferRecipient: inputTransferRecipient,
      transferAmount: inputTransferAmount,
    };

    return inputs;
  }

  header() {
    return [
      el(`.${this.getStyleClasses().parentClassMain}__header-top`, [
        el(
          `h2.${this.getStyleClasses().parentClassMain}__title.page-title`,
          this.page === 'accountdetail' ? 'Просмотр счета' : 'История баланса'
        ),
        this.btnBack,
      ]),
      el(`.${this.getStyleClasses().parentClassMain}__header-bottom`, [
        el(
          `h3.${this.getStyleClasses().parentClassMain}__account-num`,
          `№ ${this._accountData.account}`
        ),
        el(`span.${this.getStyleClasses().parentClassMain}__account-balance`, [
          el('span.balance-text', 'Баланс'),
          el(
            'span.balance-amount',
            { 'data-account-balance': '' },
            `${this._accountData.balance} P`
          ),
        ]),
      ]),
    ];
  }

  dinamicBalanceWindow(isTotalAmount) {
    if (!this.monthObj) {
      this.monthObj = this.getMonths();
    }
    const renderGraphVar = this.graph(isTotalAmount);
    return el(
      `.${this.getStyleClasses().parentClassBlock}.${
        this.getStyleClasses().parentClassBlockBalance
      }`,
      [
        el(
          `h2.${this.getStyleClasses().parentClassBlock}__title.${
            this.getStyleClasses().parentClassBlockBalance
          }__title`,
          isTotalAmount
            ? 'Динамика баланса'
            : 'Соотношение входящих исходящих транзакций'
        ),
        el(
          `.${this.getStyleClasses().parentClassGraph} graph-grid-${
            this.qtyMonth
          }`,
          [
            el(
              `.${this.getStyleClasses().parentClassGraph}__grid graph-grid-${
                this.qtyMonth
              }`,
              renderGraphVar.graph
            ),
            el(
              `.${this.getStyleClasses().parentClassGraph}__os-y`,
              renderGraphVar.osY
            ),
            el(
              `ul.${
                this.getStyleClasses().parentClassGraph
              }__os-x-list graph-grid-${this.qtyMonth}`,
              renderGraphVar.graph
                .map((graphItem, i) =>
                  el(
                    `li.${this.getStyleClasses().parentClassGraph}__os-x-item`,
                    this.getDate(i, { month: 'long' }, 'ru').slice(0, 3)
                  )
                )
                .reverse()
            ),
          ]
        ),
      ]
    );
  }

  transferHistoryWindow() {
    return el(
      `.${this.getStyleClasses().parentClassBlock}.${
        this.getStyleClasses().parentClassBlockHistory
      }`,
      // ////////////////////////////////////////////
      [
        el(
          `h2.${this.getStyleClasses().parentClassBlock}__title.${
            this.getStyleClasses().parentClassBlockHistory
          }__title`,
          'История переводов'
        ),
        // el(`.${this.getStyleClasses().parentClassBlockHistory}__block`, [
        el(`.${this.getStyleClasses().parentClassBlockHistory}__header`, [
          el(
            `ul.${this.getStyleClasses().parentClassBlockHistory}__header-list`,
            [
              el(
                `li.${
                  this.getStyleClasses().parentClassBlockHistory
                }__header-item`,
                'Счёт отправителя'
              ),
              el(
                `li.${
                  this.getStyleClasses().parentClassBlockHistory
                }__header-item`,
                'Счёт получателя'
              ),
              el(
                `li.${
                  this.getStyleClasses().parentClassBlockHistory
                }__header-item`,
                'Сумма'
              ),
              el(
                `li.${
                  this.getStyleClasses().parentClassBlockHistory
                }__header-item`,
                'Дата'
              ),
            ]
          ),
        ]),
        this.tableTransferHistory(this._accountData),
        // ]),
      ]
    );
  }

  tableTransferHistory(billData) {
    const parentClass = 'transfer';
    const transferList = el(`ul.${parentClass}__list`);
    const transferBlock = el(`.${parentClass}`, transferList);

    const itarator =
      billData.transactions.length > this.maxLengthTransferHistory
        ? this.maxLengthTransferHistory
        : billData.transactions.length;
    for (let i = 1; i <= itarator; i++) {
      const isIncomingTransfer =
        billData.account ===
        billData.transactions[billData.transactions.length - i].to;

      const transferAmount = el(
        `span.${parentClass}__amount.${
          isIncomingTransfer
            ? `${parentClass}__incoming`
            : `${parentClass}__outgoing`
        }`,
        [
          isIncomingTransfer ? '+ ' : '- ',
          billData.transactions[billData.transactions.length - i].amount,
          ' P',
        ]
      );

      const transferDate = el(
        `span.${parentClass}__date`,
        billData.transactions[billData.transactions.length - i].date
          .split('T')[0]
          .split('-')
          .reverse()
          .join('.')
      );

      const transferItem = el(`li.${parentClass}__item`, [
        el(
          `span.${parentClass}__from`,
          billData.transactions[billData.transactions.length - i].from
        ),
        el(
          `span.${parentClass}__to`,
          billData.transactions[billData.transactions.length - i].to
        ),
        transferAmount,
        transferDate,
      ]);
      transferList.append(transferItem);
    }

    return transferBlock;
  }

  getMonths() {
    const months = [];
    let maxAmountPerMonth = 0;
    let maxOutgoingAmountPerMonth = 0;

    for (let i = 0; i < this.qtyMonth; i++) {
      const { totalIncoming, totalOutgoing } =
        this._accountData.transactions.reduce(
          (acc, item) => {
            const transferMonth = item.date
              .split('T')[0]
              .split('-')
              .reverse()
              .slice(1, 3)
              .join('.');
            if (
              this.getDate(i, { month: 'numeric', year: 'numeric' }, 'ru') ===
              transferMonth
            ) {
              item.to === this._accountData.account
                ? (acc.totalIncoming += item.amount)
                : (acc.totalOutgoing += item.amount);
            }

            acc.totalIncoming = Number(acc.totalIncoming.toFixed(2));
            acc.totalOutgoing = Number(acc.totalOutgoing.toFixed(2));

            return acc;
          },
          { totalIncoming: 0, totalOutgoing: 0 }
        );

      const month = new MonthData(
        this.getDate(i, { month: 'long' }, 'ru'),
        this.getDate(i, { month: 'long' }, 'en'),
        this.getDate(i, { month: 'numeric', year: 'numeric' }, 'ru'),
        totalIncoming,
        totalOutgoing
      );
      months.push(month);
      maxAmountPerMonth = Math.max(maxAmountPerMonth, month.amountTotal);
      maxOutgoingAmountPerMonth = Math.max(
        maxOutgoingAmountPerMonth,
        month.amountOutgoing
      );
    }
    months.reverse();
    return { months, maxAmountPerMonth, maxOutgoingAmountPerMonth };
  }

  graph(isTotalAmount) {
    const maxTotalLimit = this.geyAmountLimit(this.monthObj.maxAmountPerMonth);
    const maxOutgoingLimit = this.geyAmountLimit(
      this.monthObj.maxOutgoingAmountPerMonth
    );

    const osY = [
      el('.graph__limit', maxTotalLimit),
      !isTotalAmount
        ? el(
            '.graph__limit',
            {
              style: `height: ${(maxOutgoingLimit / maxTotalLimit) * 100 + 5}%`,
            },
            [el('span', maxOutgoingLimit), el('span', '0')]
          )
        : el('.graph__limit', '0'),
    ];

    let graph = [];
    for (let month of this.monthObj.months) {
      graph.push(
        el(`.graph__grid-item`, [
          el(
            isTotalAmount ? `.graph__total-amount` : '.graph__incoming-amount',
            {
              'data-amount': month.amountIncoming,
              'data-month': month.monthNameEN,
              style: `height: ${(month.amountIncoming / maxTotalLimit) * 100}%`,
            }
          ),
          el(
            isTotalAmount ? `.graph__total-amount` : '.graph__outgoing-amount',
            {
              'data-amount': month.amountOutgoing,
              'data-month': month.monthNameEN,
              style: `height: ${(month.amountOutgoing / maxTotalLimit) * 100}%`,
            }
          ),
        ])
      );
    }
    return { osY, graph };
  }

  getDate(n, options, lang) {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth() - n
    ).toLocaleString(lang, options);
  }

  geyAmountLimit(amount) {
    let multiple = 1;
    while (amount > multiple) {
      multiple *= 10;
    }
    multiple /= 100;
    return Math.ceil(amount / multiple) * multiple;
  }
}

export class AccountDetailsViewAccount extends AccountDetails {
  maxLengthTransferHistory = 10;
  renderPage() {
    const main = el(
      `main.${this.getStyleClasses().parentClassMain}`,
      el('.container', [
        this.header(),
        el(
          `.${
            this.getStyleClasses().parentClassMain
          }__detail-info detail-info-grid`,
          [
            this.transferWindow(),
            el(
              'a.history-balance-link.history-translates',
              {
                href: `?page=balancehistory&acc=${this._accountData.account}`,
              },
              this.transferHistoryWindow()
            ),
          ]
        ),
      ])
    );

    return main;
  }

  transferWindow() {
    return el(
      `.${this.getStyleClasses().parentClassBlock} ${
        this.getStyleClasses().parentClassBlockTranslate
      }`,
      [
        el(
          `h2.${this.getStyleClasses().parentClassBlock}__title`,
          'Новый перевод'
        ),
        el('.input-group', [
          el(
            `span.${
              this.getStyleClasses().parentClassBlockTranslate
            }__input-title`,
            'Номер счёта получателя'
          ),
          this.inputs.transferRecipient,
        ]),
        el('.input-group', [
          el(
            `span.${
              this.getStyleClasses().parentClassBlockTranslate
            }__input-title`,
            'Сумма перевода'
          ),
          this.inputs.transferAmount,
        ]),
        this.btnTransfer,
      ]
    );
  }

  autoFill(rememderedAccounts) {
    const dropBoxItems = rememderedAccounts.reverse().map((item) => {
      return el(`button.dropbox__btn`, { 'data-rem-acc': item }, item);
    });
    const dropboxList = dropBoxItems.map((item) =>
      el(`li.dropbox__item`, item)
    );
    const dropbox = el(
      `.dropbox`,
      { style: `width: ${this.inputs.transferRecipient.clientWidth + 2}px;` },
      el(`ul.dropbox__list`, dropboxList)
    );

    return { dropbox, dropBoxItems };
  }
}

export class AccountDetailsViewHistoryBalance extends AccountDetails {
  maxLengthTransferHistory = 25;
  renderPage() {
    const main = el(
      `main.${this.getStyleClasses().parentClassMain}`,
      el('.container', [
        this.header(),
        el(
          `.${
            this.getStyleClasses().parentClassMain
          }__detail-info detail-info-flex`,
          [
            // this.dinamicBalanceWindow(true),
            // this.dinamicBalanceWindow(false),
            this.transferHistoryWindow(),
          ]
        ),
      ])
    );

    return main;
  }
}

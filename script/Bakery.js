class Bakery {
  constructor({ id, name, schedule }) {
    this.$root = document.createElement("div")
    this.id = id
    this.name = name
    this.week = schedule
  }

  render() {
    this.distributeWeek()
    this.toHtml()

    return this.$root
  }

  distributeWeek() {
    this.daysInterval = []
    this.daysOff = []
    this.htmlList = []
    this.prevDay = {}

    for (const day in this.week) {
      this.distributeDay(day)
    }
    this.daysToHtmlList(this.daysInterval) // Convert rest days to arr
    this.daysOffToHtmlList(this.daysOff) // Convert all daysoff to arr
  }

  distributeDay(dayName) {
    const curDay = this.week[dayName]

    if (curDay.day_off) {
      this.isDayOff(dayName)
    } else if (
      curDay.order_before == this.prevDay.order_before &&
      curDay.days_before_order == this.prevDay.days_before_order
    ) {
      this.daysInterval.push(dayName)
    } else {
      this.sameDaysEnd(dayName)
    }
    this.prevDay = curDay
  }

  isDayOff(dayName) {
    this.daysOff.push(dayName)
    this.daysToHtmlList(this.daysInterval)
    this.daysInterval = []
  }

  sameDaysEnd(dayName) {
    this.daysToHtmlList(this.daysInterval)
    this.daysInterval = [dayName] // Start new interval with current day
  }

  daysToHtmlList(dayNames) {
    if (!dayNames.length) return

    const { order_before, days_before_order } = this.week[dayNames[0]] // The values in arr must be the same, so we take the 1st

    const time = order_before ? `Before <b>${order_before / 60}:00</b>,` : ""
    const daysBeforeStr = days_before_order > 1 ? "days" : "day"

    const [dayFrom, dayTo] = [dayNames[0], dayNames[dayNames.length - 1]]
    const dayNameText = dayNames.length > 1 ? dayFrom + "-" + dayTo : dayFrom

    const htmlString = `<span>For ${dayNameText}</span>: ${time}<i> ${days_before_order} ${daysBeforeStr}</i> before`
    this.htmlList.push(htmlString)
  }

  daysOffToHtmlList(dayNames) {
    if (!dayNames.length) return

    const htmlString = `<span>${dayNames.join(", ")}</span>: closed`
    this.htmlList.push(htmlString)
  }

  toHtml() {
    let $ul = document.createElement("ul")
    $ul.className = "schedule-list"

    this.$root.className = "schedule"
    this.$root.id = this.id

    this.htmlList.forEach((dailySchedule) => {
      let $li = document.createElement("li")
      $li.innerHTML = dailySchedule

      $ul.appendChild($li)
    })

    this.$root.innerHTML = `<h4 class="bakeries-title">${this.name}</h4>`
    this.$root.appendChild($ul)
  }
}

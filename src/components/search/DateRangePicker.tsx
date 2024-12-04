import React from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import 'react-day-picker/dist/style.css';

interface DateRangePickerProps {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
}

export default function DateRangePicker({ selected, onSelect }: DateRangePickerProps) {
  const { t } = useTranslation();
  const disabledDays = { before: new Date() };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        disabled={disabledDays}
        numberOfMonths={2}
        pagedNavigation
        showOutsideDays
        fixedWeeks
        className="!bg-white"
        modifiersStyles={{
          selected: {
            backgroundColor: '#f59e0b',
            color: 'white'
          },
          today: {
            color: '#f59e0b',
            fontWeight: 'bold'
          }
        }}
        labels={{
          labelMonthDropdown: () => t('datePicker.selectMonth'),
          labelYearDropdown: () => t('datePicker.selectYear'),
          labelNext: () => t('datePicker.nextMonth'),
          labelPrevious: () => t('datePicker.previousMonth'),
        }}
      />
    </div>
  );
}
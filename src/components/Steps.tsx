import { useState } from "react";
import "./Steps.css";

interface IRecordsData {
  date: string;
  distance: number;
}

export default function Steps() {
  const [records, setRecords] = useState<IRecordsData[]>([
    {
      date: "2024-07-01",
      distance: 22,
    },
    {
      date: "2024-07-02",
      distance: 11,
    },
  ]);
  const [date, setDate] = useState<string>("");
  const [distance, setDistance] = useState<number | "">("");
  const [editIndex, setEditIndex] = useState<number>(-1);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (date && distance) {
      const newRecords = [...records];
      const foundRecord = records.find((item) => item.date === date);

      if (foundRecord) {
        foundRecord.distance += Number(distance);
        setRecords(newRecords);
      } else {
        newRecords.push({ date, distance: Number(distance) });
      }
      newRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRecords(newRecords);
      setDate("");
      setDistance("");
      setEditIndex(-1);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.value as number | "");
  };

  const saveEditedRecord = (event: React.FormEvent) => {
    event.preventDefault();

    if (editIndex >= 0) {
      const newRecords = [...records];

      newRecords[editIndex] = { date, distance: Number(distance) };
      newRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setRecords(newRecords);
      setDate("");
      setDistance("");
      setEditIndex(-1);
    }
  };

  const handleEditRecord = (index: number) => {
    const recToEdit = records[index];
    setDate(recToEdit.date);
    setDistance(recToEdit.distance);
    setEditIndex(index);
  };

  const handleRemoveRecord = (index: number) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  return (
    <>
      <div className="inputs">
        <form className="tr" onSubmit={onSubmit}>
          <div className="inputs-headers">
            <h4 className="date-header">Дата</h4>
            <h4 className="km-header">Пройдено км</h4>
          </div>

          <input
            className="date-input"
            type="date"
            value={date}
            onChange={handleDateChange}
          />

          <input
            className="km-input"
            type="number"
            placeholder=""
            step={0.1}
            min={0}
            value={distance}
            onChange={handleDistanceChange}
          />

          {editIndex === -1 ? (
            <button type="submit" className="td">
              Добавить
            </button>
          ) : (
            <button onClick={saveEditedRecord} className="td">
              Ok
            </button>
          )}
        </form>
      </div>
      <div style={{ marginTop: "20px" }} className="table-headers">
        <h4 className="date-header">Дата</h4>
        <h4 className="km-header">Пройдено км</h4>
        <h4 className="km-header">Действия</h4>
      </div>
      <table style={{ padding: "0 50px 0 50px" }}width={550}>
        <tbody className="records">
          {records.map((item, index) => (
            <tr key={index}>
              <td width="15%">{item.date.split("-").reverse().join(".")}</td>
              <td width="60%">{item.distance}</td>
              <td width="5%" onClick={() => handleEditRecord(index)}>
                ✎
              </td>
              <td width="5%" onClick={() => handleRemoveRecord(index)}>
                ✘
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
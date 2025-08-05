import { Label, Input, FormGroup } from "reactstrap";

const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <FormGroup style={{ minWidth: 150, marginRight: 10 }}>
      {label && <Label>{label}</Label>}
      <Input type="select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default FilterSelect;
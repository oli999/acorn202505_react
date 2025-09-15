// MemberForm.jsx
import { useState } from "react";
import axios from "axios";

const HOBBY_OPTIONS = ["축구", "독서", "게임", "음악", "등산"];

export default function MemberForm() {
  // 기본값: 성별 male (원하시면 ""로 두고 필수검증 하셔도 됩니다)
  const [form, setForm] = useState({
    name: "",
    gender: "male",
    hobbies: [], // 다중 선택
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState(null); // 서버 검증 에러 표시용(선택)

  // 텍스트/라디오 공통 핸들러
  const onChange = (e) => {
    const { name, value, type } = e.target;
    // radio, text 모두 value로 갱신
    if (type === "radio" || type === "text") {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // 체크박스(다중) 핸들러
  const onToggleHobby = (e) => {
    const { value, checked } = e.target;
    setForm((f) => {
      if (checked) return { ...f, hobbies: [...f.hobbies, value] };
      return { ...f, hobbies: f.hobbies.filter((h) => h !== value) };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);

    try {
      // 서버가 JSON을 받는 경우 (권장)
      const res = await axios.post("/api/v1/members", form, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("성공:", res.data);
      alert("등록되었습니다!");

      // 전송 후 초기화
      setForm({ name: "", gender: "male", hobbies: [] });
    } catch (err) {
      console.error(err);
      // 서버가 { code, errors: { field: message } } 식으로 줄 때 표시 예시
      const data = err.response?.data;
      if (data?.errors) setErrors(data.errors);
      else alert("요청 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
      <div>
        <label>
          이름
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="이름을 입력하세요"
          />
        </label>
        {errors?.name && <div style={{ color: "crimson" }}>{errors.name}</div>}
      </div>

      <div style={{ marginTop: 12 }}>
        <div>성별</div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={form.gender === "male"}
            onChange={onChange}
          />
          남성
        </label>
        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === "female"}
            onChange={onChange}
          />
          여성
        </label>
        {errors?.gender && (
          <div style={{ color: "crimson" }}>{errors.gender}</div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <div>취미 (복수 선택)</div>
        {HOBBY_OPTIONS.map((opt) => (
          <label key={opt} style={{ display: "inline-block", marginRight: 12 }}>
            <input
              type="checkbox"
              value={opt}
              checked={form.hobbies.includes(opt)}
              onChange={onToggleHobby}
            />
            {opt}
          </label>
        ))}
        {errors?.hobbies && (
          <div style={{ color: "crimson" }}>{errors.hobbies}</div>
        )}
      </div>

      <button type="submit" disabled={submitting} style={{ marginTop: 16 }}>
        {submitting ? "전송 중..." : "제출"}
      </button>
    </form>
  );
}

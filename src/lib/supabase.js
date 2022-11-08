import { createClient } from "@supabase/supabase-js";

class SupabaseClient {
  client = null;

  constructor() {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

    this.client = createClient(supabaseUrl, supabaseKey);
  }

  // 정상적인 API 응답여부를 검증 후
  // 정상적인 값이면 data를 리턴하고
  // 정상적인 응답이 아니면 에러를 throw한다
  validateResponse(response) {
    let { status, data, error } = response;

    if (status == 200 || status == 201) {
      return data;
    } else {
      throw error;
    }
  }

  // 모든 항목들을 조회한다
  async getItems() {
    try {
      const response = await this.client
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

      return this.validateResponse(response);
    } catch (err) {
      console.log(err);
    }
  }

  // 단일 항목을 생성한다
  async addItem(title) {
    try {
      const response = await this.client.from("todos").insert([
        {
          title: title,
        },
      ]);

      return this.validateResponse(response);
    } catch (err) {
      console.log(err);
    }
  }

  // id에 매칭되는 항목을 갱신한다
  async updateItemById(id, params) {
    try {
      const response = await this.client
        .from("todos")
        .update(params)
        .eq("id", id);

      return this.validateResponse(response);
    } catch (err) {
      console.log(err);
    }
  }

  // id에 매칭되는 항목을 삭제한다
  async deleteItemById(id) {
    try {
      const response = await this.client.from("todos").delete().eq("id", id);

      return this.validateResponse(response);
    } catch (err) {
      console.log(err);
    }
  }
}

export default SupabaseClient;

const JAVA_KEY = "62";
const CPP_KEY = "53";
const PYTHON_KEY = "70";
const BASE_URL = "http://34.72.83.62/submissions"

      let data = {
        source_code: code,
        language_id: lang_id,
        number_of_runs: "1",
        stdin: "Judge0",
        expected_output: null,
        cpu_time_limit: "2",
        cpu_extra_time: "0.5",
        wall_time_limit: "5",
        memory_limit: "128000",
        stack_limit: "64000",
        max_processes_and_or_threads: "60",
        enable_per_process_and_thread_time_limit: false,
        enable_per_process_and_thread_memory_limit: false,
        max_file_size: "1024",
      };
      console.log(data)
      let request = $.ajax({
        url: BASE_URL,
        type: "post",
        data: data,
      });

      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      // Callback handler that will be called on success
      request.done(async function (response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
        let token = response.token;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 sec
        let second_request = $.ajax({
          url: BASE_URL + "/"+ token,
          type: "get",
        });
        second_request.done(function (response) {
          console.log(response.stdout);
          $("#ans").html(response.stdout);
        });
      });
  
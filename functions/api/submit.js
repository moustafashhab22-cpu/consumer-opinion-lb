export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    const appsScriptUrl = context.env.APPS_SCRIPT_URL;

    if (!appsScriptUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "APPS_SCRIPT_URL is not configured"
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.text();

    return new Response(result, {
      status: response.status,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Server error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}



using HelpAMateAPI.Interfaces;

namespace HelpAMateAPI.Models;

public class ApiResponse
{ 
    public string Message { get; }
    public object Data { get; }
    public ApiResponse(string message, object data)
    {
        Message = message;
        Data = data;
    }

   
}


using HelpAMateAPI.Interfaces;

namespace HelpAMateAPI.Models;

public class ApiResponse<T>
{
    public int CodeStatus { get; set; }
    public T Data { get; set; }
}
using HelpAMateAPI.Models;

namespace HelpAMateAPI;

public static class DataMock
{
    public static readonly List<Wish> Wishes =  new List<Wish>()
    {
        new()
        {
            Id = 1,
            Title = "Grocery Shopping Assistance",
            Description = "Help with grocery shopping by either providing a list of items to buy or by physically going to the store and purchasing the items on behalf of the requester.",
        },
        new()
        {
            Id = 2,
            Title = "Pet Sitting",
            Description = "Taking care of a requester's pet(s) while they are away from home for a few hours or days.",
        },
        new()
        {
            Id = 3,
            Title = "Technology Help",
            Description = "Assisting someone with setting up a new device or troubleshooting a technical issue with their computer, phone, or other electronic device.",
        },
        new()
        {
            Id = 4,
            Title = "Gardening Assistance",
            Description = "Helping with gardening tasks such as planting, weeding, or watering.",
        },
        new()
        {
            Id = 5,
            Title = "Language Translation",
            Description = "Assisting with translation of written or spoken content from one language to another.",
        },
        new()
        {
            Id = 6,
            Title = "Event Planning",
            Description = "Helping with the planning and organization of events such as birthday parties or weddings.",
        },
        new()
        {
            Id = 7,
            Title = "Personal Shopping",
            Description = "Assisting with shopping for clothing, accessories, or other items based on the requester's preferences and needs.",
        },
        new()
        {
            Id = 8,
            Title = "Pet Sitting",
            Description = "Taking care of a requester's pet(s) while they are away from home for a few hours or days.",
        }
    };
    /*public static readonly List<User> Users = new() 
    {
        new User()
        {
            Id = 1,
            Username = "Alice",
            AvatarUrl = "https://example.com/avatar/alice.jpg"
        },
        new User()
        {
            Id = 2,
            Username = "Bob",
            AvatarUrl = "https://example.com/avatar/bob.jpg"
        },
        new User()
        {
            Id = 3,
            Username = "Charlie",
            AvatarUrl = "https://example.com/avatar/charlie.jpg"
        },
    };*/
}
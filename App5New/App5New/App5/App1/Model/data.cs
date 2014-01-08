using SQLite;
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;



public class Age
{
    [PrimaryKey, AutoIncrement]
    public int ID { get; set; }

    [MaxLength(30)]
    public string name { get; set; }

    [MaxLength(30)]
    public string image { get; set; }

    [MaxLength(100)]
    public string info { get; set; }
}

public class Base
{
    [PrimaryKey, AutoIncrement]
    public int ID { get; set; }

    [MaxLength(30)]
    public string name { get; set; }

    [MaxLength(30)]
    public string image { get; set; }

    [MaxLength(30)]
    public string label { get; set; }

    [MaxLength(30)]
    public string info { get; set; }

    [MaxLength(10)]
    public string Sports { get; set; }

    [MaxLength(10)]
    public string Energy { get; set; }

    [MaxLength(10)]
    public string naturalEnergy { get; set; }

    [MaxLength(10)]
    public string Weight { get; set; }
}

public class childBase
{
    [PrimaryKey, AutoIncrement]
    public int ID { get; set; }

    [MaxLength(30)]
    public string name { get; set; }

    [MaxLength(30)]
    public string image { get; set; }

    [MaxLength(30)]
    public string label { get; set; }

    [MaxLength(30)]
    public string info { get; set; }

}


public class dbConnect
{
    private async void CreateDatabase()
    {
        SQLiteAsyncConnection conn = new SQLiteAsyncConnection("thinkitdrinkitDatabase");
        await conn.CreateTableAsync<Age>();
    }

}


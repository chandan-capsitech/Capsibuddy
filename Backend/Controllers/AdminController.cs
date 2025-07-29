using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly FaqService _faqService;

        public AdminController(FaqService faqService)
        {
            _faqService = faqService;
        }

        // get all faqs
        [HttpGet("faqs")]
        public async Task<ApiResponse<List<Faq>>> GetAllFaqs()
        {
            var res = new ApiResponse<List<Faq>>();
            try
            {
                res.Result = await _faqService.GetAllAsync();
                res.Status = true;
                res.Message = "Fetched Successfully";
            }
            catch (Exception ex)
            {
                res.Message = ex.Message;
                res.Status = false;
            }
            return res;
        }


        // create a faq
        [HttpPost("faqs")]
        public async Task<ApiResponse<Faq>> CreateFaq([FromBody] CreateFaqRequest request)
        {
            var res = new ApiResponse<Faq>();
            try
            {
                // edge case checking
                if (string.IsNullOrWhiteSpace(request.Question) ||
                    string.IsNullOrWhiteSpace(request.Answer))
                {
                    res.Status = false;
                    res.Message = "Question and answer are required";
                    return res;
                }

                var faq = new Faq
                {
                    Question = request.Question,
                    Answer = request.Answer,
                    Options = request.Options!
                };
                await _faqService.CreateAsync(faq);
                res.Status = true;
                res.Message = "Faq created";
                res.Result = faq;
            }
            catch (Exception ex)
            {
                res.Message = ex.Message;
                res.Status = false;
            }
            return res;
        }


        // update a faq
        [HttpPut("faqs/{id}")]
        public async Task<ApiResponse<Faq>> UpdateFaq(string id, UpdateFaqRequest request)
        {
            var res = new ApiResponse<Faq>();
            try
            {
                var exist = await _faqService.GetByIdAsync(id);
                if (exist is null)
                {
                    res.Status = false;
                    res.Message = "FAQ not found";
                    return res;
                }
                var success = await _faqService.UpdateAsync(id, request.Question!, request.Answer!, request.Options!);
                res.Status = success;
                res.Message = "Updated";
                res.Result = await _faqService.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                res.Status = false;
                res.Message = ex.Message;
            }
            return res;
        }


        [HttpDelete("faqs/{id}")]
        public async Task<ApiResponse<Faq>> DeleteFaq(string id)
        {
            var res = new ApiResponse<Faq>();
            try
            {
                var faq = await _faqService.GetByIdAsync(id);
                if (faq is null)
                {
                    res.Status = false;
                    res.Message = "FAQ not found";
                    return res;
                }
                var success = await _faqService.DeleteAsync(id);
                res.Status = success;
                res.Message = "Deleted successfully";
                res.Result = faq;
            }
            catch (Exception ex)
            {
                res.Status = false;
                res.Message = ex.Message;
            }
            return res;
        }
    }
}